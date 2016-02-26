import { Router } from 'express';
import * as <%= entity.name %>Controller from '../controllers/<%= entity.name %>.controller';
const router = new Router();

<% for (var key in actions) { %>
router.route('/<%= key %>').get<%= %>Controller.<%= key %>);
<% } %>

export default router;
