import { traced } from '@sliit-foss/functions';
import { saveRule, retrieveRuleById, retrieveRules, updateRuleById, deleteRuleById } from '../../repository';

export const addRule = (rule) => {
  return traced(saveRule)(rule);
};

export const getRule = (id) => {
  return traced(retrieveRuleById)(id);
};

export const getRules = (filters, sorts, page, limit) => {
  return traced(retrieveRules)(filters, sorts, page, limit);
};

export const updateRule = (id, payload) => {
  return traced(updateRuleById)(id, payload);
};

export const deleteRule = (id) => {
  return traced(deleteRuleById)(id);
};
