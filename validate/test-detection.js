const { execSync } = require('child_process');

try {
    console.log("Running vulnerability scan...");
    const auditOutput = execSync('npm audit --json', { encoding: 'utf-8' });

    const auditResult = JSON.parse(auditOutput);

    if (auditResult.metadata.vulnerabilities.total > 0) {
        console.error("Vulnerabilities detected:");
        auditResult.advisories.forEach(advisory => {
            console.error(`- ${advisory.title} (CVE-${advisory.cves.join(', ')})`);
            console.error(`  Severity: ${advisory.severity}`);
            console.error(`  Package: ${advisory.module_name}`);
            console.error(`  Affected Versions: ${advisory.vulnerable_versions}`);
            console.error(`  Remediation: ${advisory.url}`);
        });
        process.exit(1); 
    } else {
        console.log("No vulnerabilities detected.");
        process.exit(0); 
    }
} catch (error) {
    console.error("Error occurred during vulnerability scan:", error);
    process.exit(1); 
}
