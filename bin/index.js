#! /usr/bin/env node
import fs from 'fs';
import path from 'path';
import childProcess from 'child_process';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
/**
 * 获取Git信息
 */
function getGitstamp() {
    try{
        const branch  = childProcess.execSync('git branch --show-current').toString().trim();
        const commitID = childProcess.execSync('git show -s --format=%"H"').toString().trim();
        const commitAuthor = childProcess.execSync('git show -s --format=%"cN"').toString().trim();
        const commitMessage = childProcess.execSync('git show -s --format=%"s"').toString().trim();
        const commitTime = childProcess.execSync('git show -s --format=%"cd"').toString().trim();
        const commitDate = `${new Date(commitTime).toLocaleDateString()} ${new Date(commitTime).toLocaleTimeString()}`;
        return { branch, commitID, commitDate, commitAuthor, commitMessage };
    }catch(err) {
        console.log(chalk.bgRed('Gitstamp：Git调用出错，请检查。'));
        console.log(chalk.bgRed(err));
    }
    return {};
}
/**
 * 写入Git信息
 * @param {*} i 
 */
function writeGitstamp(i) {
    try{
        const absPath = fileURLToPath(import.meta.url);
        // 回退两个层级定位到主目录
        const basic = path.dirname(path.dirname(absPath));
        fs.writeFileSync(path.join(basic, './index.js'), `export default ${JSON.stringify(i, null, 4)};`);
    }catch(err) {
        console.log(chalk.bgRed('Gitstamp：文件写入出错，请检查。'));
        console.log(chalk.bgRed(err));
    }
}

writeGitstamp(getGitstamp());
