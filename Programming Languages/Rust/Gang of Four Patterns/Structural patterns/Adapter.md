allows two incompatible interfaces to work together

```rust
trait MediaPlayer {
    fn play(&self, file_type: &str, file_name: &str);
}

trait AdvancedMediaPlayer {
    fn play_vlc(&self, file_name: &str);
    fn play_mp4(&self, file_name: &str);
}

struct VlcPlayer;

impl AdvancedMediaPlayer for VlcPlayer {
    fn play_vlc(&self, file_name: &str) {
        println!("Playing vlc file: {}", file_name);
    }

    fn play_mp4(&self, _: &str) {
        // do nothing
    }
}

struct Mp4Player;

impl AdvancedMediaPlayer for Mp4Player {
    fn play_vlc(&self, _: &str) {
        // do nothing
    }

    fn play_mp4(&self, file_name: &str) {
        println!("Playing mp4 file: {}", file_name);
    }
}

struct MediaAdapter {
    advanced_media_player: Box<dyn AdvancedMediaPlayer>,
}

impl MediaPlayer for MediaAdapter {
    fn play(&self, file_type: &str, file_name: &str) {
        match file_type {
            "vlc" => self.advanced_media_player.play_vlc(file_name),
            "mp4" => self.advanced_media_player.play_mp4(file_name),
            _ => println!("Invalid media type: {}", file_type),
        }
    }
}

struct AudioPlayer;

impl AudioPlayer {
    fn play(&self, file_type: &str, file_name: &str) {
        match file_type {
            "mp3" => println!("Playing mp3 file: {}", file_name),
            "vlc" | "mp4" => {
                let media_adapter = MediaAdapter {
                    advanced_media_player: match file_type {
                        "vlc" => Box::new(VlcPlayer),
                        "mp4" => Box::new(Mp4Player),
                        _ => unreachable!(),
                    },
                };
                media_adapter.play(file_type, file_name);
            }
            _ => println!("Invalid media type: {}", file_type),
        }
    }
}

fn main() {
    let audio_player = AudioPlayer;
    audio_player.play("mp3", "song.mp3");
    audio_player.play("vlc", "movie.vlc");
    audio_player.play("mp4", "video.mp4");
    audio_player.play("avi", "movie.avi");
}
```