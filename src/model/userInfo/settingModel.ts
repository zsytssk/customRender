import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { getAudio, setMusic, setVoice } from './userInfoUtils';

export const SettingEvent = {
    VoiceChange: 'voice_change',
    MusicChange: 'music_change',
};
/** 设置数据 */
export class SettingModel extends ComponentManager {
    /** 声音 */
    public voice: number;
    /** 背景音乐 */
    public music: number;
    constructor() {
        super();
        this.addCom(new EventCom());
    }
    public initAudio() {
        const [voice, music] = getAudio();
        this.voice = voice;
        this.music = music;
    }
    public get event() {
        return this.getCom(EventCom);
    }

    public setVoice(voice: number) {
        if (voice === this.voice) {
            return;
        }
        this.voice = voice;
        setVoice(voice);
        this.event.emit(SettingEvent.VoiceChange, voice);
    }
    public setMusic(music: number) {
        if (music === this.music) {
            return;
        }
        this.music = music;

        setMusic(music);
        this.event.emit(SettingEvent.MusicChange, music);
    }
}
