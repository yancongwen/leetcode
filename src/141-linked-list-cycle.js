/*
 * @leetcode: https://leetcode-cn.com/problems/linked-list-cycle/
 * @Descripttion: 环形链表：给定一个链表，判断链表中是否有环
 * @Author: Javon Yan
 * @Date: 2021-02-06 18:54:04
 * @LastEditTime: 2021-02-06 20:13:55
 */

 /**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @description 解法一：双指针（快慢指针）
 * 借助一个慢指针和一个快指针，如果链表中存在环，则两个指针一定会相遇
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (!head || !head.next) {
        return false
    }
    let fast = head.next
    while (head !== fast) {
        if (head && fast && fast.next) {
            head = head.next
            fast = fast.next.next
        } else {
            return false
        }
    }
    return true
};

/**
 * @description 解法二：哈希表
 * 借助哈希表存储已经访问过的节点
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let map = new Map()
    while (head) {
        if (map.get(head)) {
            return true
        } else {
            map.set(head, 1)
            head = head.next
        }
    }
    return false
};

/**
 * @description 解法三：纯属娱乐
 * 如果对象中存在循环引用，则 JSON.stringify 报错
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    try {
        JSON.stringify(head)
    } catch(e) {
        return true
    }
    return false
};
