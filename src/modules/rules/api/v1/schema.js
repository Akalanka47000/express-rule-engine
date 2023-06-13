import { Joi } from 'celebrate';

export const addRuleSchema = Joi.object({
  name: Joi.string().required(),
  conditions: Joi.object().required(),
  event: Joi.object().required(),
});

export const updateRuleSchema = Joi.object({
  name: Joi.string().optional(),
  conditions: Joi.object().optional(),
  event: Joi.object().optional(),
});

export const processRuleSchema = Joi.object({
  facts: Joi.alternatives().try(Joi.object(), Joi.array())
.required(),
});
