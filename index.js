import hrtime from 'browser-process-hrtime';
import BrowserStdout from 'browser-stdout';

process.hrtime = process.hrtime || hrtime;
process.stdout = process.stdout || BrowserStdout();

export default process;
