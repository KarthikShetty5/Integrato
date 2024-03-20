const { execSync } = require('child_process');

try {
    // Run npm audit to check for vulnerabilities
    console.log("Running vulnerability scan...");
    const auditOutput = execSync('npm audit --json', { encoding: 'utf-8' });

    // Parse the JSON output
    const auditResult = JSON.parse(auditOutput);

    // Check if there are vulnerabilities
    if (auditResult.metadata.vulnerabilities.total > 0) {
        console.error("Vulnerabilities detected:");
        // Output vulnerability details
        auditResult.advisories.forEach(advisory => {
            console.error(`- ${advisory.title} (CVE-${advisory.cves.join(', ')})`);
            console.error(`  Severity: ${advisory.severity}`);
            console.error(`  Package: ${advisory.module_name}`);
            console.error(`  Affected Versions: ${advisory.vulnerable_versions}`);
            console.error(`  Remediation: ${advisory.url}`);
        });
        process.exit(1); // Exit with failure code
    } else {
        console.log("No vulnerabilities detected.");
        process.exit(0); // Exit with success code
    }
} catch (error) {
    console.error("Error occurred during vulnerability scan:", error);
    process.exit(1); // Exit with failure code
}
