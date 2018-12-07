-- SELECT b.latitude, b.longitude, ROUND((3959*acos( cos( radians(33.79) )
--       * cos( radians(b.latitude) )
--       * cos( radians(b.longitude) - radians(-84.32) )
--       + sin( radians(33.79) )
--       * sin( radians(-84.43) ) ) ), 2 ) AS distance_miles
-- from Booking b;


/*lat :30.17563972410843
long: -91.32717004256733*/


SELECT ROUND( 3959 * acos( cos( radians(${uLat}) )
* cos( radians(latitude) )
* cos( radians(longitude) - radians(${uLong}) )
+ sin( radians(${uLat}) )
* sin( radians(latitude) ) ),2 ) as distance_miles
from Booking;
