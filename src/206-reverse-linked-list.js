/*
 * @leetcode: https://leetcode-cn.com/problems/reverse-linked-list/
 * @Descripttion: 反转链表
 * @Author: ycwen1119@163.com
 * @Date: 2021-02-07 14:17:39
 */

 /**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @description 方法一：迭代法，从前向后处理
 * 两个指针向后移动
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null
    while(head) {
        let next = head.next
        head.next = prev
        prev = head
        head = next
    }
    // 最后 head === null，prev 才是链表头
    return prev
};

/**
 * @description 方法二：递归，从后向前处理
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head || !head.next) {
        return head
    }
    let newHead = reverseList(head.next)
    head.next.next = head
    head.next = null
    return newHead
};
