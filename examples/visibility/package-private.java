// file: com/spotify/model/Artist.java
package com.spotify.model;

class Artist {               // no modifier: only com.spotify.model can use it
}

// file: com/spotify/model/Album.java
package com.spotify.model;

public class Album {         // public: every package can use it
    private final Artist artist = new Artist();   // allowed: same package
}
