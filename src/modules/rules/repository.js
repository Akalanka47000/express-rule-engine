import { Rule } from './api/v1/model';

export const saveRule = (rule) => {
  return Rule.create(rule);
};

export const retrieveRuleById = (id) => {
  return Rule.findById(id).lean();
};

export const retrieveRules = (filters = {}, sorts = {}, page, limit) => {
  if (page && limit) {
    return Rule.paginate(filters, { sort: sorts, page, limit, lean: true });
  }
  return Rule.find(filters)
    .sort(sorts)
    .lean();
};

export const updateRuleById = (id, rule) => {
  return Rule.findByIdAndUpdate(id, rule, { new: true }).lean();
};

export const deleteRuleById = (id) => {
  return Rule.findByIdAndDelete(id).lean();
};
