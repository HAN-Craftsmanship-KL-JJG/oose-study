// file: model/album.cpp
namespace {                  // anonymous namespace: only this file can use it

class Artist {
};

}

class Album {                // declared in album.h: every file that includes it can use it
    Artist artist;           // allowed: same file
};
