create view Preferences as 
	select UserId, sum(volume) as Total, Type from own natural join stock group by userid, type;

CREATE VIEW PREFERENCES AS (
	SELECT UserId, StockId, Volume FROM Own NATURAL JOIN Stock
)

[ [ 75, 76, 458, 157, 757, 343, 362 ],
  [ 103, 143, 296, 117, 559, 227, 720 ],
  [ 33, 156, 371, 208, 714, 216, 593 ],
  [ 137, 99, 512, 99, 682, 268, 593 ],
  [ 64, 147, 189, 80, 628, 418, 746 ],
  [ 88, 208, 345, 178, 588, 365, 693 ],
  [ 130, 157, 389, 213, 466, 341, 496 ],
  [ 125, 137, 329, 71, 781, 390, 623 ],
  [ 56, 65, 340, 297, 782, 250, 657 ],
  [ 116, 131, 462, 191, 664, 352, 520 ],
  [ 125, 93, 602, 229, 601, 319, 468 ],
  [ 44, 238, 440, 245, 618, 324, 546 ],
  [ 0, 205, 415, 284, 511, 260, 788 ],
  [ 45, 68, 400, 199, 585, 290, 565 ],
  [ 0, 124, 308, 268, 612, 350, 585 ],
  [ 177, 113, 315, 235, 581, 317, 673 ],
  [ 162, 164, 486, 222, 576, 289, 542 ],
  [ 62, 157, 476, 158, 779, 341, 428 ],
  [ 163, 56, 415, 176, 542, 438, 672 ],
  [ 112, 156, 489, 108, 566, 285, 667 ],
  [ 65, 147, 407, 163, 421, 477, 698 ],
  [ 90, 197, 477, 128, 534, 327, 572 ],
  [ 150, 192, 397, 86, 613, 287, 459 ],
  [ 145, 0, 430, 199, 568, 385, 582 ],
  [ 165, 199, 321, 212, 571, 310, 726 ],
  [ 90, 241, 552, 229, 676, 470, 498 ],
  [ 93, 56, 249, 167, 717, 200, 685 ],
  [ 118, 223, 495, 128, 422, 251, 734 ],
  [ 124, 27, 460, 186, 781, 366, 701 ],
  [ 175, 136, 283, 208, 714, 252, 688 ],
  [ 29, 0, 579, 137, 871, 360, 658 ],
  [ 126, 69, 484, 219, 417, 438, 619 ],
  [ 55, 172, 432, 153, 665, 266, 706 ] ]