function doesLineInterceptCircle(A, B, C, radius) {
    var dist;
    const v1x = B[0] - A[0];
    const v1y = B[1] - A[1];
    const v2x = C[0] - A[0];
    const v2y = C[1] - A[1];
    // get the unit distance along the line of the closest point to
    // circle center
    const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);


    // if the point is on the line segment get the distance squared
    // from that point to the circle center
    if (u >= 0 && u <= 1) {
        dist = (A[0] + v1x * u - C[0]) ** 2 + (A[1] + v1y * u - C[1]) ** 2;
    } else {
        // if closest point not on the line segment
        // use the unit distance to determine which end is closest
        // and get dist square to circle
        dist = u < 0 ?
            (A[0] - C[0]) ** 2 + (A[1] - C[1]) ** 2 :
            (B[0] - C[0]) ** 2 + (B[1] - C[1]) ** 2;
    }
    return dist < radius * radius;
}