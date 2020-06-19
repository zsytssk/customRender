import { AudioCtrl } from 'ctrl/audioCtrl';
import { getCurUserId, getUserInfo } from 'model/modelState';
import { getItem, setItem } from 'utils/localStorage';

export function getCacheBalance() {
    const user_id = getCurUserId();
    return getItem(`${user_id}:balance`);
}
export function setCacheBalance(balance: string) {
    if (balance === undefined) {
        return;
    }
    const user_id = getCurUserId();
    return setItem(`${user_id}:balance`, balance);
}
export function getAudio(user_id: string) {
    const voice_str = getItem(`${user_id}:voice`);
    const music_str = getItem(`${user_id}:music`);
    const music = music_str ? Number(music_str) : 0.5;
    const voice = voice_str ? Number(voice_str) : 0.5;
    AudioCtrl.setVoice(voice);
    AudioCtrl.setMusic(music);
    return [voice, music];
}
export function setVoice(voice: number) {
    const user_id = getCurUserId();
    AudioCtrl.setVoice(voice);
    setItem(`${user_id}:voice`, voice + '');
}
export function setMusic(music: number) {
    const user_id = getCurUserId();
    AudioCtrl.setMusic(music);
    setItem(`${user_id}:music`, music + '');
}

export function getCurrencyIcon(currency?: string) {
    const { account_map } = getUserInfo();
    return account_map.get(currency)?.icon;
}
