#!/usr/bin/env node

/**
 * Cleanup Prisma Script
 *
 * This script cleans up Prisma-related files and directories from the project
 * and modifies any files that might have references to Prisma.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to remove
const dirsToRemove = [
  'prisma',
  'lib/generated/prisma'
];

// Check if path exists before removal
function safeRemove(pathToRemove) {
  const fullPath = path.join(process.cwd(), pathToRemove);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing: ${pathToRemove}`);

    if (fs.lstatSync(fullPath).isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }

    return true;
  } else {
    console.log(`Path not found, skipping: ${pathToRemove}`);
    return false;
  }
}

// Main execution
function cleanup() {
  console.log('Starting Prisma cleanup...');

  // 1. Remove directories
  dirsToRemove.forEach(dir => safeRemove(dir));

  // 2. Update .gitignore - remove Prisma references
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    let content = fs.readFileSync(gitignorePath, 'utf8');
    content = content.replace(/\/lib\/generated\/prisma\s*/, '');
    content = content.replace(/\/prisma\/\*\.db\s*/, '');
    fs.writeFileSync(gitignorePath, content);
    console.log('Updated .gitignore');
  }

  // 3. Check if there are any remaining references to Prisma in the codebase
  try {
    console.log('\nChecking for remaining Prisma references:');
    const grepOutput = execSync('grep -r "prisma" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .', { encoding: 'utf8' });
    console.log(grepOutput);
    console.log('\nWarning: Some references to Prisma still exist in the project. Please review them manually.');
  } catch (error) {
    if (error.status === 1) {
      console.log('No remaining references to Prisma found in the codebase.');
    } else {
      console.error('Error running grep:', error.message);
    }
  }

  console.log('\nPrisma cleanup complete!');
  console.log('\nNote: You may want to remove Prisma dependencies from package.json if they exist.');
}

cleanup();
