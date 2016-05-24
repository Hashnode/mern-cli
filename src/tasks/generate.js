import writeFile from 'writefile';
import settings from '../../settings';
import UI from '../ui/ui';
import fileExists from '../util/fileExists';
import isComponent from '../util/isComponent';
import checkAndWrite from './checkAndWrite';
import readAndRenderTempate from './readAndRenderTemplate';

class generate {
    constructor() {
        this.ui = new UI({});
    }

    run(args) { // eslint-disable-line
        if (args.length < 3) {
            return this.ui.writeError('Please pass relevent number of arguments');
        }

        const blueprint = args[0];
        const entityName = args[1];
        let baseDirectoryMapping;
        const upperCaseEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);

        try {
            baseDirectoryMapping = require(`${process.cwd()}/${settings.CONFIG_FILE_NAME}`); // eslint-disable-line
        } catch (e) {
            return this.ui.writeError('Make sure your are in root directory of your mern boilerplate.');
        }

        if (isComponent(blueprint)) {
            if (fileExists(`${process.cwd() + baseDirectoryMapping[blueprint]}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`)) {
                this.ui.writeError('File already exists please choose another name.');
                exit(1);
            }

            writeFile(`${process.cwd() + baseDirectoryMapping[blueprint]}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`, readAndRenderTempate(blueprint, entityName, this.ui), err => {
                if (err) {
                    this.ui.writeError(err);
                } else {
                    this.ui.writeInfoLine(`Created ${upperCaseEntityName}.jsx in ${process.cwd()}${baseDirectoryMapping[blueprint]}/${upperCaseEntityName}`);
                }
            });
        } else if (blueprint === 'route') {
            checkAndWrite(baseDirectoryMapping, 'route', readAndRenderTempate('route', entityName, this.ui), `${entityName}.routes`, this.ui);
            checkAndWrite(baseDirectoryMapping, 'controller', readAndRenderTempate('controller', entityName, this.ui), `${entityName}.controller`, this.ui);
        } else if (blueprint === 'fullstack') {
            checkAndWrite(baseDirectoryMapping, 'route', readAndRenderTempate('route', entityName, this.ui), `${entityName}.routes`, this.ui);
            checkAndWrite(baseDirectoryMapping, 'controller', readAndRenderTempate('controller', entityName, this.ui), `${entityName}.controller`, this.ui);
            checkAndWrite(baseDirectoryMapping, 'model', readAndRenderTempate('model', entityName, this.ui), entityName, this.ui);

            if (fileExists(`${process.cwd() + baseDirectoryMapping.dumb}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`)) {
                this.ui.writeError('File already exists please choose another name.');
                exit(1);
            }

            writeFile(`${process.cwd() + baseDirectoryMapping.dumb}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`, readAndRenderTempate('dumb', entityName, this.ui), err => {
                if (err) {
                    this.ui.writeError(err);
                } else {
                    this.ui.writeInfoLine(`Created ${upperCaseEntityName}.jsx in ${process.cwd()}${baseDirectoryMapping.dumb}/${upperCaseEntityName}`);
                }
            });
        } else {
            checkAndWrite(baseDirectoryMapping, blueprint, readAndRenderTempate(blueprint, entityName, this.ui), entityName, this.ui);
        }
    }
}

export default generate;
