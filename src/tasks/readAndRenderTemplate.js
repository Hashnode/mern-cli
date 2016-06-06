import fs from 'fs';
import ejs from 'ejs';
import helpers from '../util/ejsHelpers';

/**
 * Read the blueprint file and render ejs with the given parameters
 * @param bluePrintPath
 * @param entityName
 * @param ui
 * @param parent
 * @returns {string}
 */
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
