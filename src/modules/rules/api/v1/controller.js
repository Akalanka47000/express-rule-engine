import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { traced, tracedAsyncHandler } from '@sliit-foss/functions';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { response } from '../../../../utils';
import { addRule, getRule, getRules, updateRule, deleteRule } from './service';
import { addRuleSchema, updateRuleSchema } from './schema';

const rules = express.Router();

rules.post(
  '/',
  celebrate({ [Segments.BODY]: addRuleSchema }),
  tracedAsyncHandler(async function addRuleController(req, res) {
    const rule = await traced(addRule)(req.body);
    return response({ res, message: 'Rule added successfully', data: rule });
  }),
);

rules.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function retrieveRulesController(req, res) {
    const rules = await traced(getRules)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return response({ res, message: 'Rules retreived successfully', data: rules });
  }),
);

rules.get(
  '/:id',
  tracedAsyncHandler(async function getSingleRuleController(req, res) {
    const rule = await traced(getRule)(req.params.id);
    return response({ res, message: 'Rule retreived successfully', data: rule });
  }),
);

rules.patch(
  '/:id',
  celebrate({ [Segments.BODY]: updateRuleSchema }),
  tracedAsyncHandler(async function updateRuleController(req, res) {
    const rule = await traced(updateRule)(req.params.id, req.body);
    return response({ res, message: 'Rule updated successfully', data: rule });
  }),
);

rules.delete(
  '/:id',
  tracedAsyncHandler(async function deleteRuleController(req, res) {
    const rule = await traced(deleteRule)(req.params.id);
    return response({ res, message: 'Rule deleted successfully', data: rule });
  }),
);

export default rules;
