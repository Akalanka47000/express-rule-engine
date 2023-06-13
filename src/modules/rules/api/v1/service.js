import { traced } from '@sliit-foss/functions';
import { Engine } from 'json-rules-engine';
import { saveRule, retrieveRuleById, retrieveRules, updateRuleById, deleteRuleById } from '../../repository';

const engine = new Engine();

(async function loadRules() {
  const rules = await traced(retrieveRules)({ clean: true });
  rules.forEach((rule) => engine.addRule(rule));
})();

export const addRule = async (rule) => {
  const result = await traced(saveRule)(rule);
  engine.addRule(rule);
  return result;
};

export const getRule = (id) => {
  return traced(retrieveRuleById)(id);
};

export const getRules = (filters, sorts, page, limit) => {
  return traced(retrieveRules)({ filters, sorts, page, limit });
};

export const updateRule = async (id, payload) => {
  const result = await traced(updateRuleById)(id, payload, true);
  engine.updateRule(result);
  return result;
};

export const deleteRule = async (id) => {
  const rule = await traced(deleteRuleById)(id);
  engine.removeRule(rule.name);
  return;
};

export const processRule = (facts) => {
  return engine.run(facts);
};
