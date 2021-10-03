from hashlib import md5
import random
import string
import threading
import re

def random_string(len_str):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for i in range(len_str))

p = re.compile(b".*'or'[1-9].*", re.IGNORECASE)

is_done = False
def test_hashes():
    global is_done

    i = 0
    while not is_done:
        random_len = random.randint(8, 32)
        random_str = random_string(random_len)
        hash_val = md5(random_str.encode('utf-8')).digest()
        if i % 500000 == 0:
            print(threading.current_thread().name, i, random_str, hash_val)
        i += 1
        if p.match(hash_val) is not None:
            print('yaaaay:', random_str, hash_val)
            is_done = True
            break
    print(is_done)

t1 = threading.Thread(target=test_hashes, name="t1")
t2 = threading.Thread(target=test_hashes, name="t2")
t3 = threading.Thread(target=test_hashes, name="t3")
t4 = threading.Thread(target=test_hashes, name="t4")
t5 = threading.Thread(target=test_hashes, name="t5")
t6 = threading.Thread(target=test_hashes, name="t6")
t7 = threading.Thread(target=test_hashes, name="t7")
t8 = threading.Thread(target=test_hashes, name="t8")

t1.start()
t2.start()
t3.start()
t4.start()
t5.start()
t6.start()
t7.start()
t8.start()


t1.join()
t2.join()
t3.join()
t4.join()
t5.join()
t6.join()
t7.join()
t8.join()