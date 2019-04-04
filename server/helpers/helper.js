module.exports = {

  getRelevantHeroStats(array) {

    const results = [];
    array.forEach((el) => {
      results.push({
        id: el.id,
        name: el.localized_name,
        primary_attr: el.primary_attr,
        attack_type: el.attack_type,
        roles: el.roles,
        img: `https://api.opendota.com${el.img}`,
        icon: `https://api.opendota.com${el.icon}`,
        base_health: el.base_health,
        base_health_regen: el.base_health_regen,
        base_mana: el.base_mana,
        base_mana_regen : el.base_mana_regen ,
        base_armor: el.base_armor,
        base_mr: el.base_mr,
        base_attack_min: el.base_attack_min,
        base_attack_max: el.base_attack_max,
        base_str: el.base_str,
        base_agi: el.base_agi,
        base_int: el.base_int,
        str_gain: el.str_gain,
        agi_gain: el.agi_gain,
        int_gain: el.int_gain,
        attack_range: el.attack_range,
        projectile_speed: el.projectile_speed,
        attack_rate: el.attack_rate,
        move_speed: el.move_speed,
        turn_rate: el.turn_rate,
        cm_enabled: el.cm_enabled,
        legs: el.legs
      })
    })
    return results;
  },

  groupHeroesByAttr(array){
    const agi = [];
    const int = [];
    const str = [];

    array.forEach((el) => {
      switch(el.primary_attr) {
        case 'agi':
          agi.push(el)
        break;
        case 'int':
          int.push(el)
        break;
        case 'str': 
          str.push(el)
        break;
        default:
        break;
     }
    })
    return { agi, int, str }
  }

}