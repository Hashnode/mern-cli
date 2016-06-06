import fs from 'fs';

/**
 * Helper function to check whether file exists in given path or not.
 * @param path
 * @returns {boolean}
 */
export default path => {
    try {
        fs.accessSync(path, fs.F_OK);
        return true;
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        }

        throw e;
    }
};
