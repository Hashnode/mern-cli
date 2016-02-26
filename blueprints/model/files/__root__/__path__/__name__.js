import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const <%= entity.name %>Schema = new Schema({
<% for (var key in attributes) { %>    <%= key %>: { type: '<%= attributes[key] %>' },
<% } %>});

export default mongoose.model('<%= entity.name %>', <%= entity.name %>Schema);
