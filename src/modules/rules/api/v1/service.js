import { traced } from '@sliit-foss/functions';
import { default as createError } from 'http-errors';
import { RuleEngine } from '../../../../utils';
import { saveRule, retrieveRuleById, retrieveRuleByName, retrieveRules, updateRuleById, deleteRuleById } from '../../repository';
import { ruleKey } from '../../constants';
import { redis } from '../../../../database/redis';

export const addRule = (rule) => {
  return traced(saveRule)(rule);
};

export const getRule = (id) => {
  return traced(retrieveRuleById)(id);
};

export const getRules = (filters, sorts, page, limit) => {
  return traced(retrieveRules)({ filters, sorts, page, limit });
};

export const updateRule = (id, payload) => {
  return traced(updateRuleById)(id, payload).then((rule) => {
    redis.set(ruleKey(rule), rule);
    return rule;
  });
};

export const deleteRule = (id) => {
  return traced(deleteRuleById)(id).then((rule) => {
    redis.del(ruleKey(rule));
    return rule;
  });
};

export const processRule = async (rule, facts) => {
  rule = await redis.getOrDefault(ruleKey(rule), () => traced(retrieveRuleByName)(rule));
  if (!rule) throw createError(404, "Rule not found")
  const engine = new RuleEngine([rule], { allowUndefinedFacts: true });
  return engine.run(facts);
};
