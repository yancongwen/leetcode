/*
 * @leetcode: https://leetcode-cn.com/problems/lru-cache/
 * @Description: LRU 缓存机制（最近最少使用）
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-09 13:02:07
 */

// LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字已经存在，则变更其数据值；
// 如果关键字不存在，则插入该组「关键字-值」;
// 当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间;

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


/**
 * @ description 方法一：双向链表
 * @param {number} capacity
 */

class ListNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.prev = null
        this.next = null
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
        this.dummyHead = new ListNode() // 虚拟头结点
        this.dummyTail = new ListNode() // 虚拟尾节点
        this.dummyHead.next = this.dummyTail
        this.dummyTail.prev = this.dummyHead
    }

    get(key) {
        let node = this.map.get(key)
        if (node) {
            this.moveToHead(node)
            return node.value
        }
        return -1
    }

    put(key, value) {
        let node = this.map.get(key)
        if (node) {
            node.value = value
            this.moveToHead(node)
        } else {
            node = new ListNode(key, value)
            this.insertHead(node)
            this.map.set(key, node)
        }
        if (this.map.size > this.capacity) {
            this.popNode()
        }
    }

    moveToHead(node) {
        this.removeNode(node)
        this.insertHead(node)
    }

    removeNode(node) {
        let prev = node.prev
        let next = node.next
        prev.next = next
        next.prev = prev
    }

    // 插入链表头
    insertHead(node) {
        node.next = this.dummyHead.next
        node.prev = this.dummyHead
        node.next.prev = node
        this.dummyHead.next = node
    }

    // 删除最后一个节点
    popNode() {
        let lastNode = this.dummyTail.prev
        this.map.delete(lastNode.key)
        this.removeNode(lastNode)
    }
}


/**
 * @ description 方法二：直接利用数组管理顺序
 * @param {number} capacity
 */

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.keys = []
        this.map = {}
    }

    get(key) {
        let index = this.keys.indexOf(key)
        if (index > -1) {
            this.keys.splice(index, 1)
            this.keys.push(key)
            return this.map[key]
        }
        return -1
    }

    put(key, value) {
        let index = this.keys.indexOf(key)
        if (index > -1) {
            this.keys.splice(index, 1)
            this.keys.push(key)
            this.map[key] = value
        } else {
            if (this.keys.length === this.capacity) {
                this.keys.shift()
                delete this.map[key]
            }
            this.keys.push(key)
            this.map[key] = value
        }
    }
}


/**
 * @ description 方法三：利用 Map 特性（Map 的遍历顺序就是插入顺序）
 * @param {number} capacity
 */

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
    }

    get(key) {
        let value = this.map.get(key)
        if (value === undefined) return -1
        this.map.delete(key)
        this.map.set(key, value) // 更新位置
        return value
    }

    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key)
        }
        this.map.set(key, value)
        if (this.map.size > this.capacity) {
            this.map.delete(this.map.entries().next().value[0]) // 删除最先插入的
        }
    }
}
