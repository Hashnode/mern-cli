import ejs from 'ejs';
import helpers from '../util/ejsHelpers';
require('shelljs/global');

export default (targetPath, entityName, ui, parentPath = null, parent = null) => {
    const parsedPath = ejs.render(targetPath, {
        name: entityName,
        helpers,
    });
    let parsedParentPath = '';

    if (parent) {
        parsedParentPath = ejs.render(parentPath, {
            parent,
            helpers,
        });
        if (test('-e', `${process.cwd()}/${parsedParentPath}`)) {
            parsedParentPath = `${parsedParentPath}/`;
        } else {
            ui.writeError(`Module ${parent} doesn't exist in ${parsedParentPath}.`);
            return process.exit(1);
        }
    }

    if (!test('-e', parsedParentPath + parsedPath)) {
        return parsedParentPath + parsedPath;
    }

    ui.writeError(`File already exists in ${parsedPath}. Please choose another name.`);
    return process.exit(1);
};
