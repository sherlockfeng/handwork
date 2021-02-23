const reverseKGroup = (head, k) => {
    const reverse = (start, end) => {
        let pre = end.next;
        let cur = start;
        while (pre !== end) {
            const next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        return [start, end];
    };

    const hair = new ListNode(0);
    hair.next = head;
    let pre = hair;

    while (head) {
        let tail = pre;
        for (let i = 0; i < k; i++) {
            tail = tail.next;
            if (!tail) {
                return hair.next;
            }
        }
        const next = tail.next;
        const [end, start] = reverse(head, tail);
        pre.next = start;
        end.next = next;
        pre = end;
        head = end.next;
    }

    return hair.next;
};
