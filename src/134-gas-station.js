/*
 * @leetcode: https://leetcode-cn.com/problems/gas-station/
 * @Descripttion: 加油站：
 * @Author: Javon Yan
 * @Date: 2021-02-06 18:54:04
 * @LastEditTime: 2021-02-06 20:13:46
 */

/**
 * @description 暴力法，两层循环
 * 从第一个站点开始依次遍历，计算以该站点为起始站点是否能绕一周，能绕一周则满足条件循环结束，否则继续遍历下一个站点。
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let result = -1
    let len = gas.length
    for (let i = 0; i < len; i++) {
        let tank = 0
        for (let j = 0; j < len; j++) {
            let index = (i + j) >= len ? i + j - len : i + j
            tank = tank + gas[index] - cost[index]
            if (tank < 0) {
                break
            }
        }
        if (tank >= 0) {
            result = i
            break
        }
    }
    return result
};

/**
 * @description 对暴力法的优化，两层循环，减少第一层循环的次数
 * 以第一个节点为起始站点，依次计算判断是否能到达下一个站点，如果发现无法达到站点A，那么就以站点A为起始站点，继续下一次循环。
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let start = 0
    let len = gas.length
    while (start < len) {
        let i = 0
        let tank = 0
        while (i < len) {
            let index = (start + i) % len
            tank = tank + gas[index] - cost[index]
            if (tank < 0) {
                start = start + i + 1
                break
            }
            i++
        }
        if (tank >= 0 ) {
            return start
        }
    }
    return -1
};
