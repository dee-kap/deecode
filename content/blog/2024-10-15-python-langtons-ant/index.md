---
title: Writing Langton's Ant in Python
date: 2024-10-15
tags: ["Tech", "Python"]
permalink: "blog/2024/10/15/python-langtons-ant/"
draft: false
---
# Langton's Ant in Python

I was looking for a fun little exercise I could write in Python and I came across Langton's Ant. According to Wikipedia:

> Langton's ant is a two-dimensional Turing machine with a very simple set of rules but complex emergent behavior. It was invented by Chris Langton in 1986 and runs on a square lattice of black and white cells.

This could be fun, I thought. I started writing the code and quickly realised that I need a library which can be used to draw basic graphics. I came across [pygame](https://www.pygame.org/wiki/about). Pygame is simple, easy to understand and suitable for my basic needs.

I got the code done in short time and enjoyed watching the patterns being created by the code I wrote.

```python
import pygame
from pygame.constants import QUIT

#         If the ant is on a white cell:
#             Turn 90 degrees to the right (clockwise).
#             Flip the color of the cell to black.
#             Move forward one cell.
#         If the ant is on a black cell:
#             Turn 90 degrees to the left (counterclockwise).
#             Flip the color of the cell to white.
#             Move forward one cell.

class Ant:
    def __init__(self, x, y, upper_bound, cell_size, direction=0) -> None:
        self.x = x
        self.y = y
        self.upper_bound = upper_bound
        self.cell_size = cell_size
        self.direction = direction
        self.directions = ["up", "right", "down", "left"]

    def move_forward(self):
        if self.direction == 0:
            self.move_up()
        elif self.direction == 1:
            self.move_right()
        elif self.direction == 2:
            self.move_down()
        elif self.direction == 3:
            self.move_left()

    def turn_right(self):
        self.direction = (self.direction + 1) % len(self.directions)

    def turn_left(self):
        self.direction = (self.direction - 1) % len(self.directions)

    def move_up(self):
        if self.y == 0:
            self.y = self.upper_bound
        else:
            self.y = self.y - self.cell_size

    def move_down(self):
        if self.y == self.upper_bound:
            self.y = 0
        else:
            self.y = self.y + self.cell_size

    def move_left(self):
        if self.x == 0:
            self.x = self.upper_bound
        else:
            self.x = self.x - self.cell_size

    def move_right(self):
        if self.x == self.upper_bound:
            self.x = 0
        else:
            self.x = self.x + self.cell_size


pygame.init()

def main():
    WHITE = "white"
    BLACK = "black"
    WIDTH = 1200
    HEIGHT = 1200
    CELL_SIZE = 5
    SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))
    CLOCK = pygame.time.Clock()
    running = True

    SCREEN.fill("black")

    GRID = {}
    grid_list = []
    for x in range(0, WIDTH, CELL_SIZE):
        for y in range(0, HEIGHT, CELL_SIZE):
            grid_list.append((x, y))

    for item in grid_list:
        GRID[item] = WHITE

    # print(GRID)

    middle_x = (WIDTH // CELL_SIZE) // 2 * CELL_SIZE
    middle_y = (HEIGHT // CELL_SIZE) // 2 * CELL_SIZE

    ant = Ant(middle_x, middle_y, WIDTH - CELL_SIZE, CELL_SIZE)

    def move_ant():
        is_white = GRID[(ant.x, ant.y)] == WHITE
        # ant.move_right()
        if is_white:
            GRID[(ant.x, ant.y)] = BLACK
            ant.turn_right()
        else:
            GRID[(ant.x, ant.y)] = WHITE
            ant.turn_left()

        ant.move_forward()

    def draw_grid():
        for cell in GRID:
            rect = pygame.Rect(cell[0], cell[1], CELL_SIZE - 2, CELL_SIZE - 2)
            pygame.draw.rect(SCREEN, GRID[(cell[0], cell[1])], rect)

    while running:
        draw_grid()
        move_ant()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        pygame.display.update()

        CLOCK.tick(60)

    pygame.quit()


if __name__ == "__main__":
    main()

```

Maybe some day I will come back to this code and make it more elegant. For now, I'll just enjoy watching the patterns being created on my screen.
