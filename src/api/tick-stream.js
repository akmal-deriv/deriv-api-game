const DerivAPIBasic = require('@deriv/deriv-api/dist/DerivAPIBasic');

const api = new DerivAPIBasic({ endpoint: 'frontend.binaryws.com', lang: 'EN', app_id: 31635 });
const token = process.env.REACT_APP_API_KEY;

export default async function setEnemyLevelSession() {
    try {
        await api.authorize(token);
        let old_data;
        const initial_tick = await api.ticks('R_100');
        const floor_initial_tick = Math.floor(initial_tick.tick.ask);

        sessionStorage.setItem('play_enabled', true);
        sessionStorage.setItem('previous_tick', floor_initial_tick);
        old_data = parseInt(sessionStorage.getItem('previous_tick'));

        setInterval(async () => {
            const new_tick = await api.ticks('R_100');
            const floor_new_tick = Math.floor(new_tick.tick.ask);
            const pre_calc_enemy_level = parseInt(old_data) - floor_new_tick;
            const enemy_level =  pre_calc_enemy_level < 0 ? -1 * pre_calc_enemy_level : pre_calc_enemy_level;
            
            sessionStorage.setItem('previous_tick', floor_new_tick);
            sessionStorage.setItem('enemy_level', enemy_level);
            old_data = parseInt(sessionStorage.getItem('previous_tick'));
        }, 3500);
    } catch (response) {
        console.error(response.error.message);
        sessionStorage.setItem('play_enabled', false);
    }
}