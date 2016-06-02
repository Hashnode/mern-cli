import writeFile from 'writefile';
import settings from '../../settings';
import UI from '../ui/ui';
import fileExists from '../util/fileExists';
import isComponent from '../util/isComponent';
import checkAndWrite from './checkAndWrite';
import readAndRenderTemplate from './readAndRenderTemplate';

class generate {
    constructor(args) {
        this.ui = new UI({});
        this.processArgs(args);
        this.getMernStarterConfig();
    }

    processArgs = args => {
        if (args.length < 3) {
            this.ui.writeError('Please pass relevent number of arguments');
        }

        this.entityName = args[1];
        this.blueprint = args[0];
        this.upperCaseEntityName = this.entityName.charAt(0).toUpperCase() + this.entityName.slice(1);
    };

    getMernStarterConfig = () => {
        try {
            this.baseDirectoryMapping = require(`${process.cwd()}/${settings.CONFIG_FILE_NAME}`); // eslint-disable-line
        } catch (e) {
            this.ui.writeError('Make sure your are in root directory of your mern boilerplate.');
        }
    };

    run = () => {
        const { baseDirectoryMapping, blueprint, entityName, upperCaseEntityName } = this;

        if (isComponent(blueprint)) {
            if (fileExists(`${process.cwd() + baseDirectoryMapping[blueprint]}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`)) {
                this.ui.writeError('File already exists please choose another name.');
                process.exit(1);
            }

            writeFile(`${process.cwd() + baseDirectoryMapping[blueprint]}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`, readAndRenderTemplate(blueprint, entityName, this.ui), err => {
                if (err) {
                    this.ui.writeError(err);
                } else {
                    this.ui.writeInfoLine(`Created ${upperCaseEntityName}.jsx in ${process.cwd()}${baseDirectoryMapping[blueprint]}/${upperCaseEntityName}`);
                }
            });
        } else if (blueprint === 'route') {
            checkAndWrite(baseDirectoryMapping, 'route', readAndRenderTemplate('route', entityName, this.ui), `${entityName}.routes`, this.ui);
            checkAndWrite(baseDirectoryMapping, 'controller', readAndRenderTemplate('controller', entityName, this.ui), `${entityName}.controller`, this.ui);
        } else if (blueprint === 'fullstack') {
            checkAndWrite(baseDirectoryMapping, 'route', readAndRenderTemplate('route', entityName, this.ui), `${entityName}.routes`, this.ui);
            checkAndWrite(baseDirectoryMapping, 'controller', readAndRenderTemplate('controller', entityName, this.ui), `${entityName}.controller`, this.ui);
            checkAndWrite(baseDirectoryMapping, 'model', readAndRenderTemplate('model', entityName, this.ui), entityName, this.ui);

            if (fileExists(`${process.cwd() + baseDirectoryMapping.dumb}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`)) {
                this.ui.writeError('File already exists please choose another name.');
                process.exit(1);
            }

            writeFile(`${process.cwd() + baseDirectoryMapping.dumb}/${upperCaseEntityName}/${upperCaseEntityName}.jsx`, readAndRenderTemplate('dumb', entityName, this.ui), err => {
                if (err) {
                    this.ui.writeError(err);
                } else {
                    this.ui.writeInfoLine(`Created ${upperCaseEntityName}.jsx in ${process.cwd()}${baseDirectoryMapping.dumb}/${upperCaseEntityName}`);
                }
            });
        } else {
            checkAndWrite(baseDirectoryMapping, blueprint, readAndRenderTemplate(blueprint, entityName, this.ui), entityName, this.ui);
        }
    }
}

export default generate;
