import writeFile from 'writefile';
import UI from '../util/ui';
import readAndRenderTemplate from './readAndRenderTemplate';
import renderTargetPath from './renderTargetPath';
import getMernConfig from './getMernConfig';

class generate {
    constructor(args) {
        this.ui = new UI({});
        this.mernConfig = getMernConfig();
        this.availableBluePrints = this.mernConfig.blueprints.map(bp => bp.name);
        this.processArgs(args);
    }

    /**
     * Process the given arguments to render the target path and the target boilerplate
     * @param args
     */
    processArgs = args => {
        if (args.length < 2) {
            this.ui.writeError('Please pass relevant number of arguments');
            process.exit(1);
        }

        if (this.availableBluePrints.indexOf(args[0]) === -1) {
            this.ui.writeError(`Provided generator command '${args[0]}' is not available`);
            process.exit(1);
        }
        this.blueprint = this.mernConfig.blueprints[this.availableBluePrints.indexOf(args[0])];

        // Check whether the given entity name have a parent module name and process it if available
        if (args[1].split('/').length > 1) {
            this.parentModule = args[1].split('/')[0];
            this.entityName = args[1].split('/')[1];
        } else {
            this.entityName = args[1];
        }

        try {
            // Render target path string and render the blueprint template with ejs
            this.targets = this.blueprint.files.map(t => ({
                'blueprint-path': t['blueprint-path'],
                'target-path': renderTargetPath(t['target-path'], this.entityName, this.ui, t['parent-path'], this.parentModule),
                renderedTemplate: readAndRenderTemplate(t['blueprint-path'], this.entityName, this.ui, this.parentModule),
            }));
        } catch (e) {
            this.ui.writeError('Error rendering blueprint');
            process.exit(1);
        }
    };

    /**
     * Write the generated string to the target path
     * @param target
     */
    writeTarget = target => {
        writeFile(`${process.cwd()}/${target['target-path']}`, target.renderedTemplate, err => {
            if (err) {
                this.ui.writeError(err);
                exit(1);
            } else {
                this.ui.writeInfoLine(`Created ${target['target-path']}`);
            }
        });
    };

    /**
     * Run the code generation for all available targets
     */
    run = () => {
        this.targets.forEach(target => this.writeTarget(target));
        this.ui.writeInfoLine('File Generated Successfully');
    };
}

export default generate;
