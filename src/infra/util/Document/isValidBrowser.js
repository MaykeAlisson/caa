import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);

const isValidBrowser = _ => browser.satisfies({
    chrome: '>=40',
    edge: '>=17',
    firefox: '>=44',
    opera: '>=32',
    macos: {
        safari: '>=11.1'
    },
    mobile: {
        safari: '>=11.3',
        'android browser': '>=81',
        'Chrome': '>=81',
        'firefox': '>=68',
        'Samsung Internet for Android': '>=10',
        'UC Browser': '>=12.12'
    }
});

export default isValidBrowser;