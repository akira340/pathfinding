from collections import deque

dy = [0, 1, 0, -1]
dx = [1, 0, -1, 0]

h, w = map(int, input().split())
sy, sx = map(lambda x: int(x) - 1, input().split())
gy, gx = map(lambda x: int(x) - 1, input().split())
G = list(list(input()) for _ in range(h))

dist = [[-1]*w for _ in range(h)]
dist[sy][sx] = 0
q = deque()
q.append([sy, sx])

def bfs():
    while q:
        y, x = q.popleft()
        
        for i in range(4):
            ny = y + dy[i]
            nx = x + dx[i]
            if G[ny][nx] == '#':
                continue
            if ny < 0 or nx < 0 or ny >= h or nx >= w:
                continue
            if dist[ny][nx] != -1:
                continue
            dist[ny][nx] = dist[y][x] + 1
            q.append([ny, nx])

    print(dist[gy][gx])

bfs()

