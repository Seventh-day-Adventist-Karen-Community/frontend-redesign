Pictures and emblems for ministries, groups and classes
=======================================================

Everything here is optional. Anything without a picture or emblem shows a
placeholder (the church photo under a maroon wash, and a round badge with
initials) until you add one.

Suggested layout (any path works - it is just whatever you put in the data):

  public/ministries/children.jpg                           ministry photo
  public/ministries/clubs/pathfinders/cover.jpg            group photo
  public/ministries/clubs/pathfinders/emblem.png           group emblem
  public/ministries/clubs/pathfinders/classes/friend.png   class emblem
  public/ministries/clubs/pathfinders/classes/friend.jpg   class photo

Then reference them in src/data/ministries.ts:

  ministry: image: "/ministries/children.jpg"
  group:    image: "...cover.jpg",  emblem: "...emblem.png"
  class:    image: "...friend.jpg", emblem: "...friend.png"

Tips: emblems work best as square PNG/SVG with a transparent background.
Photos work best landscape (4:3 or 16:9) at ~1200px wide.

To add a section to ANY ministry, give it a `groups` list in the data file
(see Clubs and Children's Ministry for examples); groups can have `classes`.
