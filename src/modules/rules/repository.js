import { Rule } from './api/v1/model';

const cleanSelection = '-_id -__v -created_at -updated_at';

export const saveRule = (rule) => {
  return Rule.create(rule);
};

export const retrieveRuleById = (id) => {
  return Rule.findById(id).lean();
};

export const retrieveRules = ({ filters = {}, sorts = {}, page, limit, clean = false } = {}) => {
  if (page && limit) {
    return Rule.paginate(filters, {
      sort: sorts,
      page,
      limit,
      lean: true,
      select: (clean &&= cleanSelection),
    });
  }
  return Rule.find(filters)
    .select((clean &&= cleanSelection))
    .sort(sorts)
    .lean();
};

export const updateRuleById = (id, rule, clean = false) => {
  return Rule.findByIdAndUpdate(id, rule, { new: true })
    .lean()
    .select((clean &&= cleanSelection));
};

export const deleteRuleById = (id) => {
  return Rule.findByIdAndDelete(id).lean();
};
