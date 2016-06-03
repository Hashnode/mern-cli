import fs from 'fs';
import ejs from 'ejs';
import helpers from '../util/ejsHelpers';

export default (bluePrintPath, entityName, ui, parent = null) => {
    let template;
    try {
        template = fs.readFileSync(`${process.cwd()}/${bluePrintPath}`, 'utf8');
    } catch (e) {
        ui.writeError(`Blueprint file doesn't exist in ${bluePrintPath}.`);
        process.exit(1);
    }

    return ejs.render(template, {
        name: entityName,
        parent,
        helpers,
    });
};
