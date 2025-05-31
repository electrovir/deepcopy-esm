const {baseConfig} = require('@virmator/spellcheck/configs/cspell.config.base.cjs');

module.exports = {
    ...baseConfig,
    ignorePaths: [
        ...baseConfig.ignorePaths,
    ],
    words: [
        ...baseConfig.words,
        'customizer',
        'deepcopy',
        'domparser',
        'foobarbaz',
        'luer',
        'mediadevices',
        'mimetypearray',
        'pluginarray',
        'sasa',
        'storagemanager',
    ],
};
