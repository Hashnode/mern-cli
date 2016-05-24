import fs from 'fs';

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
