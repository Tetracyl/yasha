class TrackStream{
	constructor(url){
		this.url = url;
		this.video = false;
		this.audio = false;
		this.bitrate = 0;
		this.duration = -1;
		this.container = null;
		this.codecs = null;
	}

	setTracks(video, audio){
		this.video = video;
		this.audio = audio;

		return this;
	}

	setBitrate(bitrate){
		this.bitrate = bitrate;

		return this;
	}

	setDuration(duration){
		this.duration = duration;

		return this;
	}

	setMetadata(container, codecs){
		this.container = container;
		this.codecs = codecs;

		return this;
	}

	equals(other){
		return this == other;
	}
}

class TrackStreams extends Array{
	constructor(volume, live, time){
		super();

		this.volume = volume;
		this.live = live;
		this.time = time;
	}

	expired(){
		return false;
	}

	maybe_expired(){
		return false;
	}
}

class Track{
	constructor(platform){
		this.platform = platform;
		this.playable = true;
		this.duration = -1;
	}

	setOwner(name, icons){
		this.owner_name = name;
		this.icons = icons;

		return this;
	}

	setMetadata(id, title, duration, thumbnails){
		this.id = id;
		this.title = title;
		this.duration = duration;
		this.thumbnails = thumbnails;

		return this;
	}

	setStreams(streams){
		this.streams = streams;

		return this;
	}

	setPlayable(playable){
		this.playable = playable;

		return this;
	}

	async getStreams(){
		return null;
	}

	get url(){
		return null;
	}

	equals(other){
		return this == other || (this.platform == other.platform && this.id != null && this.id == other.id);
	}
}

class TrackResults extends Array{
	async next(){
		return null;
	}
}

class TrackPlaylist extends TrackResults{
	setMetadata(title, description){
		this.title = title;
		this.description = description;

		return this;
	}

	setFirstTrack(track){
		this.first_track = track;

		return this;
	}

	async next(){
		return null;
	}
}

class TrackImage{
	constructor(url, width, height){
		this.url = url ?? null;
		this.width = width ?? 0;
		this.height = height ?? 0;
	}

	static from(array){
		if(!array)
			return [];
		for(var i = 0; i < array.length; i++)
			array[i] = new TrackImage(array[i].url, array[i].width, array[i].height);
		return array;
	}
}

module.exports = {Track, TrackResults, TrackPlaylist, TrackImage, TrackStream, TrackStreams};