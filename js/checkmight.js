import { Chessboard, BORDER_TYPE, INPUT_EVENT_TYPE } from 'https://cdn.jsdelivr.net/npm/cm-chessboard@7.9.1/src/Chessboard.js'
import { Markers, MARKER_TYPE } from 'https://cdn.jsdelivr.net/npm/cm-chessboard@7.9.1/src/extensions/markers/Markers.js'
import { Extension, EXTENSION_POINT } from 'https://cdn.jsdelivr.net/npm/cm-chessboard@7.9.1/src/model/Extension.js'
import { Svg } from 'https://cdn.jsdelivr.net/npm/cm-chessboard@7.9.1/src/lib/Svg.js'

(function ($) {
    "use strict"

	$(document).ready(function () {

		class redrawPiecesOffBoard extends Extension {
			constructor(chessboard, props) {
				super(chessboard)

				this.props = props

				this.extraSquareHorizontal = $('<div>', {class: "col-sm"})
				this.extraSquareVertical = $('<div>', {class: "row"})

				this.legalDirections = {
					k: {legalDirections: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]], onlyOne: true},
					q: {legalDirections: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]], onlyOne: false},
					r: {legalDirections: [[0, -1], [-1, 0], [1, 0], [0, 1]], onlyOne: false},
					b: {legalDirections: [[-1, -1], [1, -1], [-1, 1], [1, 1]], onlyOne: false},
					n: {legalDirections: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]], onlyOne: true}
				}

				this.legalFiles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
				this.legalRanks = ['1', '2', '3', '4', '5', '6', '7', '8']

				this.chessboard.colorControlMarkers = this.colorControlMarkers = {b: MARKER_TYPE.circlePrimary, y: MARKER_TYPE.frameDanger, d: MARKER_TYPE.circle, r: MARKER_TYPE.circleDanger}

				this.chessboard.offBoardStartingPositions = [
					{square: "a<", piece: "br", onBoardCoords: this.chessboard.view.indexToPoint(0), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "b<", piece: "bn", onBoardCoords: this.chessboard.view.indexToPoint(1), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "c<", piece: "bb", onBoardCoords: this.chessboard.view.indexToPoint(2), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "d<", piece: "bq", onBoardCoords: this.chessboard.view.indexToPoint(3), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "e<", piece: "wbk", onBoardCoords: this.chessboard.view.indexToPoint(4), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "f<", piece: "bb", onBoardCoords: this.chessboard.view.indexToPoint(5), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "g<", piece: "bn", onBoardCoords: this.chessboard.view.indexToPoint(6), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "h<", piece: "br", onBoardCoords: this.chessboard.view.indexToPoint(7), adjustment: {x: 0, y: 1.5,}, buttonGroup: this.props.belowBoardButtons, baseButton: this.extraSquareHorizontal},

					{square: "a=", piece: "rr", onBoardCoords: this.chessboard.view.indexToPoint(63), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},
					{square: "b=", piece: "rn", onBoardCoords: this.chessboard.view.indexToPoint(55), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},
					{square: "c=", piece: "rb", onBoardCoords: this.chessboard.view.indexToPoint(47), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},
					{square: "d=", piece: "rk", onBoardCoords: this.chessboard.view.indexToPoint(39), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},
					{square: "e=", piece: "rq", onBoardCoords: this.chessboard.view.indexToPoint(31), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},
					{square: "f=", piece: "rb", onBoardCoords: this.chessboard.view.indexToPoint(23), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},
					{square: "g=", piece: "rn", onBoardCoords: this.chessboard.view.indexToPoint(15), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},
					{square: "h=", piece: "rr", onBoardCoords: this.chessboard.view.indexToPoint(7), adjustment: {x: 1.5, y: 0,}, buttonGroup: this.props.rightBoardButtons, baseButton: this.extraSquareVertical},

					{square: "a>", piece: "yr", onBoardCoords: this.chessboard.view.indexToPoint(56), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},
					{square: "b>", piece: "yn", onBoardCoords: this.chessboard.view.indexToPoint(48), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},
					{square: "c>", piece: "yb", onBoardCoords: this.chessboard.view.indexToPoint(40), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},
					{square: "d>", piece: "yq", onBoardCoords: this.chessboard.view.indexToPoint(32), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},
					{square: "e>", piece: "yk", onBoardCoords: this.chessboard.view.indexToPoint(24), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},
					{square: "f>", piece: "yb", onBoardCoords: this.chessboard.view.indexToPoint(16), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},
					{square: "g>", piece: "yn", onBoardCoords: this.chessboard.view.indexToPoint(8), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},
					{square: "h>", piece: "yr", onBoardCoords: this.chessboard.view.indexToPoint(0), adjustment: {x: -1.5, y: 0,}, buttonGroup: this.props.leftBoardButtons, baseButton: this.extraSquareVertical},

					{square: "a?", piece: "dr", onBoardCoords: this.chessboard.view.indexToPoint(56), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "b?", piece: "dn", onBoardCoords: this.chessboard.view.indexToPoint(57), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "c?", piece: "db", onBoardCoords: this.chessboard.view.indexToPoint(58), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "d?", piece: "dk", onBoardCoords: this.chessboard.view.indexToPoint(59), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "e?", piece: "dq", onBoardCoords: this.chessboard.view.indexToPoint(60), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "f?", piece: "db", onBoardCoords: this.chessboard.view.indexToPoint(61), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "g?", piece: "dn", onBoardCoords: this.chessboard.view.indexToPoint(62), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal},
					{square: "h?", piece: "dr", onBoardCoords: this.chessboard.view.indexToPoint(63), adjustment: {x: 0, y: -1.5,}, buttonGroup: this.props.aboveBoardButtons, baseButton: this.extraSquareHorizontal}
				]

				this.originalRedrawPieces = this.chessboard.view.redrawPieces.bind(chessboard.view)
				this.chessboard.view.redrawPieces = function(squares = this.chessboard.state.position.squares) {
					this.originalRedrawPieces(squares)
					this.addedRedrawPieces()
				}.bind(this)

				chessboard.getLegalMoves = this.getLegalMoves.bind(this)
				chessboard.getWinner = this.getWinner.bind(this)

				this.registerExtensionPoint(EXTENSION_POINT.positionChanged, this.exensionPointPositionChanged.bind(this))

				this.registerExtensionPoint(EXTENSION_POINT.moveInput, (event) => {
				if (event.squareFrom && event.squareTo && (
					event.squareTo == event.squareFrom ||
					event.chessboard.offBoardStartingPositions.some((pos) => pos.square == event.squareFrom) ||
					event.chessboard.getLegalMoves(event.squareFrom).includes(event.squareTo)
				)) {
						for (const i in event.chessboard.colorControlMarkers) {
							event.chessboard.removeMarkers(event.chessboard.colorControlMarkers[i])
						}

						var hypothetical = event.chessboard.state.position.clone()
						hypothetical.movePiece(event.squareFrom, event.squareTo)
						event.chessboard.getWinner(hypothetical)
					}
				})
			}

			exensionPointPositionChanged() {
				if (!this.chessboard.state.position.squares.some((square) => square != undefined)) {
					this.setStartingPosition()
					this.chessboard.view.redrawPieces()
				}
				if (!this.chessboard.offBoardStartingPositions.some((pos) => this.chessboard.getPiece(pos.square) != undefined)) {
					this.chessboard.getWinner()
					this.chessboard.disableMoveInput()
				}

			}

			getLegalMoves(square, position=this.chessboard.state.position) {
				const piece = position.getPiece(square)
				if (!piece) {
					return []
				}

				const file = square[0]
				const rank = square[1]
				const pieceType = piece.slice(-1)

				var legalMoves = []
				for (const direction of this.legalDirections[pieceType]['legalDirections']) {
					var keepGoing = true
					var newFile = file
					var newRank = rank
					while (keepGoing) {
						newFile = String.fromCharCode(newFile.charCodeAt(0) + direction[0])
						newRank = String.fromCharCode(newRank.charCodeAt(0) + direction[1])
						if (this.legalFiles.includes(newFile) && this.legalRanks.includes(newRank) && !position.getPiece(newFile + newRank)) {
							legalMoves.push(newFile + newRank)
							if (this.legalDirections[pieceType].onlyOne) {
								keepGoing = false
							}
						} else {
							keepGoing = false
						}
					}
				}
				return legalMoves
			}

			getWinner(position=this.chessboard.state.position) {
				var score = {}
				for (const rank of this.legalRanks) {
					for (const file of this.legalFiles) {
						const controlledSquares = this.getLegalMoves(file + rank, position)
						const piece = position.getPiece(file + rank)
						if (piece) {
							const color = piece.slice(-2)[0]
							for (const square of controlledSquares) {
								if (!square in score || !score[square]) {
									score[square] = {'b': 0, 'y': 0, 'd': 0, 'r': 0}
								}
								score[square][color] += 1
							}
						}
					}
				}

				var finalScore = {'b': 0, 'y': 0, 'd': 0, 'r': 0}
				for (const square in score) {
					const winner = this.getMaxKey(score[square])
					if (winner in this.colorControlMarkers) {
						finalScore[winner] += 1
						this.chessboard.addMarker(this.colorControlMarkers[winner], square)
					}
				}

				console.log("Winner: " + this.getMaxKey(finalScore))
				console.log(finalScore)
				console.log(score)
			}

			getMaxKey(obj) {
				return Object.keys(obj).reduce((a, b) => obj[a[0]] == obj[b[0]] ? a + b : obj[a[0]] > obj[b[0]] ? a : b)
			}

			setStartingPosition() {
				for (var i in this.chessboard.offBoardStartingPositions) {
					const pos = this.chessboard.offBoardStartingPositions[i]
					this.chessboard.state.position.setPiece(pos.square, pos.piece)

					var curButton = pos.baseButton.clone()
					curButton.height(this.chessboard.view.squareHeight)
					curButton.width(this.chessboard.view.squareWidth)
					pos.buttonGroup.append(curButton)
					curButton.on("mousedown", {chessboard: this.chessboard, square: pos.square}, function(event) {
						event.target.setAttribute("data-square", event.data.square)
						event.data.chessboard.view.visualMoveInput.onPointerDown(event)
						event.target.removeAttribute("data-square")
					})
				}
			}

			addedRedrawPieces() {
				for (var i in this.chessboard.offBoardStartingPositions) {
					const pos = this.chessboard.offBoardStartingPositions[i]
					const piece = this.chessboard.getPiece(pos.square)
					if (piece != undefined) {
						const adjusted_coords = {
							x: pos.onBoardCoords.x + (pos.adjustment.x * this.chessboard.view.squareWidth),
							y: pos.onBoardCoords.y + (pos.adjustment.y * this.chessboard.view.squareHeight),
						}
						var offBoardPiece = this.chessboard.view.drawPiece(this.chessboard.view.piecesGroup, piece, adjusted_coords)
						$(offBoardPiece).attr('data-square', pos.square)
					}
				}
			}
		}

		mainBoard = new Chessboard(
			document.getElementById("mainBoard"),
			{
				style: {
					cssClass: "chess-club",
					borderType: BORDER_TYPE.frame,
					pieces: {
						file: "/img/janky-pieces.svg"
					},
				},
				extensions: [
					{class: Markers, props: {sprite: "https://cdn.jsdelivr.net/npm/cm-chessboard@7.9.1/assets/extensions/markers/markers.svg"}},
					{class: redrawPiecesOffBoard, props: {
						aboveBoardButtons: $('#aboveBoardButtons'),
						leftBoardButtons: $('#leftBoardButtons'),
						rightBoardButtons: $('#rightBoardButtons'),
						belowBoardButtons: $('#belowBoardButtons')
					}}
				]
			}
		)

		mainBoard.enableMoveInput(inputHandler, 'w')
		const playerOrder = ['b', 'y', 'd', 'r']
		var currentPlayerIndex = 0
		var offBoardPiecesMovable = true
		var firstTurn = true
		var mostRecentFreeSquare

		function inputHandler(event) {
			event.chessboard.removeMarkers(MARKER_TYPE.dot)
			switch (event.type) {	
				case INPUT_EVENT_TYPE.moveInputStarted:
					const moves = event.chessboard.getLegalMoves(event.squareFrom)
					for (const move of moves) { // draw dots on possible squares
						if (!event.chessboard.getPiece(move)) {
							event.chessboard.addMarker(MARKER_TYPE.dot, move)
						}
					}
					if (mostRecentFreeSquare != undefined) {
						event.chessboard.addMarker(MARKER_TYPE.dot, mostRecentFreeSquare)
					}
					return true
				case INPUT_EVENT_TYPE.validateMoveInput:

					if (event.chessboard.offBoardStartingPositions.some((pos) => pos.square == event.squareFrom)) {
						if (![undefined, event.squareTo].includes(mostRecentFreeSquare)) {
							return false
						} else {
							mostRecentFreeSquare = undefined
						}

						currentPlayerIndex = (currentPlayerIndex + 1) % playerOrder.length
						if (currentPlayerIndex == 0) {
							firstTurn = false
						}
						if (!firstTurn) {
							offBoardPiecesMovable = false
						}
					} else {
						const moves = event.chessboard.getLegalMoves(event.squareFrom)
						if (!moves.includes(event.squareTo) || event.chessboard.getPiece(event.squareTo)) {
							return false
						}

						offBoardPiecesMovable = true
						mostRecentFreeSquare = event.squareFrom
					}

					for (const i in event.chessboard.state.position.squares) {
						const piece = event.chessboard.state.position.squares[i]
						if (piece != undefined) {
							if (piece.startsWith('w')) {
								if ((piece[1] != playerOrder[currentPlayerIndex]) || (i < 64 && offBoardPiecesMovable)) {
									event.chessboard.state.position.squares[i] = piece.slice(1)
								}
							} else {
								if (piece[0] == playerOrder[currentPlayerIndex]) {
									if (((!firstTurn) || piece[1] == 'k') && ( (i > 64 && offBoardPiecesMovable) || (i < 64 && !offBoardPiecesMovable) )) {
										event.chessboard.state.position.squares[i] = 'w' + piece
									}
								}
							}
						}
					}

					return true

				case INPUT_EVENT_TYPE.moveInputCanceled:
					console.log(`moveInputCanceled`)
			}
		}
	})

})(jQuery)
