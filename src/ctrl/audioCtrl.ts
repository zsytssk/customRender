import { Laya } from 'Laya';
import { Handler } from 'Laya/utils/Handler';
import Event from 'comMan/eventExtendCom';

export const AudioEvent = {
    VoiceChange: 'voice_change',
    MusicChange: 'music_change',
};
export type OnChange = (radio: number) => void;
/** 音频控制器 */
export class AudioCtrl {
    private static voice: number;
    private static music: number;
    private static bg_url: string;
    public static event = new Event();
    private static sound_manager = Laya.SoundManager;
    public static setVoice(radio: number) {
        const { sound_manager } = this;
        this.voice = radio;
        const isMute = radio === 0;
        if (isMute !== sound_manager.soundMuted) {
            sound_manager.soundMuted = isMute;
        }
        sound_manager.setSoundVolume(radio);
        this.event.emit(AudioEvent.VoiceChange, radio);
    }
    public static setMusic(radio: number) {
        const { sound_manager } = this;
        const isMute = radio === 0;
        if (isMute !== sound_manager.musicMuted) {
            sound_manager.musicMuted = isMute;
            this.playBg(this.bg_url);
        }
        sound_manager.setMusicVolume(radio);
        this.music = radio;
        this.event.emit(AudioEvent.MusicChange, radio);
    }
    /**
     * 播放音频
     * @param audio 音频地址
     * @param is_bg 是否是背景音乐
     */
    public static play(audio: string, is_bg = false) {
        const music = this.music || 1;
        const { playSound, soundMuted } = this.sound_manager;

        if (soundMuted) {
            return;
        }

        /** 是否重复播放 */
        // 如果是其他音乐 现将背景音乐音量变小 等到音乐放完 再设置回去
        this.sound_manager.setMusicVolume(music * 0.5);
        const play_callback = Handler.create(null, () => {
            this.sound_manager.setMusicVolume(music);
        });
        playSound(audio, 1, play_callback);
    }
    /**
     * 播放音频
     * @param audio 音频地址
     */
    public static playBg(audio: string) {
        const { playMusic, musicMuted } = this.sound_manager;
        this.bg_url = audio;

        if (musicMuted) {
            return;
        }
        playMusic(audio);
    }
    /**
     * 停止播放音频
     * @param audio 音频的名称
     */
    public static stop(audio?: string) {
        const stop_fn = this.sound_manager.stopSound;
        if (!audio) {
            return true;
        }
        if (audio.indexOf('bg') !== -1) {
            this.sound_manager.stopMusic();
        }
        stop_fn(audio);
    }
    /**
     * 停止播放所有音频
     */
    public static stopAll() {
        this.sound_manager.stopAll();
    }
}
