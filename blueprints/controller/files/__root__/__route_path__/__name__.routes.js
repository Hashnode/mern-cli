import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

<% for (var key in actions) { %>
router.route('/<%= key %>').get(PostController.<%= key %>);
<% } %>

export default router;
