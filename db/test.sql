SELECT b.bId, b.hostId, b.squareFeet, (3959 * acos( cos( radians(33.8) )
                                        * cos( radians(b.latitude) )
                                        * cos( radians(b.longitude) - radians(-84.32) )
                                        + sin( radians(33.8) )
                                        * sin( radians(b.latitude) ) ) ) AS distance_miles
FROM UnconfirmedHostSideBooking b
GROUP BY b.bId
HAVING distance_miles <= 5;
