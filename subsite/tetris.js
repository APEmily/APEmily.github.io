// Tetris constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 20;

// Tetris canvas
const canvas = document.getElementById("tetrisCanvas");
const context = canvas.getContext("2d");

// Set canvas size
canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

// Clear the canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw a single block
function drawBlock(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  context.strokeStyle = "black";
  context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

// Draw the entire game board
function drawBoard(board) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col]) {
        drawBlock(col, row, board[row][col]);
      }
    }
  }
}

// Tetris board representation
const board = [];
for (let row = 0; row < ROWS; row++) {
  board[row] = [];
  for (let col = 0; col < COLS; col++) {
    board[row][col] = null;
  }
}

// Current active piece
let piece = {
  x: 0,
  y: 0,
  matrix: null,
  color: null,
};

// List of Tetris shapes and their colors
const shapes = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
  [[1, 1, 1], [1, 0, 0]], // J
  [[1, 1, 1], [0, 0, 1]], // L
];

// Generate a random Tetris piece
function generatePiece() {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  const shape = shapes[randomIndex];
  const color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
  const matrix = shape.map((row) => [...row]);

  return { x: 3, y: 0, matrix, color };
}

// Check if a piece can move in the board
function canMove(piece, xOffset, yOffset) {
  for (let row = 0; row < piece.matrix.length; row++) {
    for (let col = 0; col < piece.matrix[row].length; col++) {
      if (piece.matrix[row][col]) {
        const newX = piece.x + col + xOffset;
        const newY = piece.y + row + yOffset;

        if (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS ||
          board[newY][newX]
        ) {
          return false;
        }
      }
    }
  }
  return true;
}
