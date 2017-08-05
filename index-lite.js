function logSupportWarning(method) {
	// eslint-disable-next-line no-console
	console.warn(
		`process.${method} is not supported in the standalone-process lite build. Use the full build to include shims.`
	);
}

process.hrtime = process.hrtime || (() => logSupportWarning('hrtime'));

if (!process.stdout) {
	Object.defineProperty(process, 'stdout', {
		get: () => logSupportWarning('stdout')
	});
}

export default process;
