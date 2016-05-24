import fs from 'fs';
import ejs from 'ejs';
import settings from '../../settings';

export default (blueprint, entityName, ui) => {
    let template;
    try {
        template = fs.readFileSync(`${settings.PROJECT_DIR}/${settings.BLUEPRINT_DIRECTORY_NAME}/${blueprint}/${settings.BLUEPRINT_NAME}`, 'utf8');
    } catch (e) {
        ui.writeError(`${blueprint} is not a valid blueprint name`);
        process.exit();
    }

    const file = ejs.render(template, {
        name: entityName,
        capitalName: entityName.charAt(0).toUpperCase() + entityName.slice(1),
    });

    return file;
};
