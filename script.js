let orderItems = [];
let itemCounter = 1;
let currentEditingIndex = -1;
let currentLanguage = 'pl';

document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('orderDate').value = new Date().toISOString().split('T')[0];
    
    
    updateTranslations();
});


const colorOptions = [
    { value: 'white', label: 'white', hex: '#FFFFFF' },
    { value: 'black', label: 'black', hex: '#000000' },
    { value: 'brown', label: 'brown', hex: '#8B4513' },
    { value: 'gray', label: 'gray', hex: '#808080' },
    { value: 'green', label: 'green', hex: '#008000' },
    { value: 'blue', label: 'blue', hex: '#0000FF' },
    { value: 'red', label: 'red', hex: '#FF0000' },
    { value: 'yellow', label: 'yellow', hex: '#FFFF00' }
];


const formTemplates = {
    door: `
        <div class="form-section">
            <div class="form-header">
                <div class="form-header-icon">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900" data-translate="door_form_title">Formularz Drzwi</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="position_id">ID/Numer pozycji</label>
                    <input type="text" name="positionId" class="form-input" readonly>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="width">Szerokość</label>
                        <input type="number" name="width" class="form-input" placeholder="cm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="height">Wysokość</label>
                        <input type="number" name="height" class="form-input" placeholder="cm">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="type">Rodzaj</label>
                    <input type="text" name="doorType" class="form-input" placeholder="np. Jednoskrzydłowe, Dwuskrzydłowe, Z dostawką, Przesuwne, Harmonijkowe">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="frame_color_inside">Kolor ramy wewnątrz</label>
                    <div class="flex space-x-2 mb-2">
                        ${generateColorPicker('frameColorInside')}
                    </div>
                    <input type="text" name="frameColorInsideCustom" class="form-input" placeholder="Własny kolor">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="frame_color_outside">Kolor ramy zewnątrz</label>
                    <div class="flex space-x-2 mb-2">
                        ${generateColorPicker('frameColorOutside')}
                    </div>
                    <input type="text" name="frameColorOutsideCustom" class="form-input" placeholder="Własny kolor">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="model_pattern">Model/wzór</label>
                    <input type="text" name="modelPattern" class="form-input">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="handle_type">Klamka typ</label>
                    <input type="text" name="handleType" class="form-input" placeholder="np. Klasyczna, Nowoczesna, Antaba, Gałka">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="handle_color">Klamka kolor</label>
                    <input type="text" name="handleColor" class="form-input" placeholder="np. Srebrny, Złoty, Czarny">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="opening_side">Strona otwierania</label>
                    <div class="radio-group">
                        <div class="radio-item">
                            <input type="radio" name="openingSide" value="left" id="openingLeft">
                            <label for="openingLeft" data-translate="left">Lewa</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" name="openingSide" value="right" id="openingRight">
                            <label for="openingRight" data-translate="right">Prawa</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="hinges">Zawiasy</label>
                    <input type="text" name="hinges" class="form-input" placeholder="np. Standardowe, Ukryte, Ciężkie, Regulowane">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="door_frame">Ościeżnica</label>
                    <input type="text" name="doorFrameMaterial" class="form-input" placeholder="np. Drewniana, Stalowa, Aluminiowa">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="threshold">Próg</label>
                    <input type="text" name="threshold" class="form-input" placeholder="np. Standardowy, Niski, Brak">
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" name="extraInsulation" id="extraInsulation">
                    <label for="extraInsulation" data-translate="extra_insulation">Extra izolacja</label>
                </div>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="notes">Uwagi</label>
                <textarea name="notes" rows="3" class="form-textarea"></textarea>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cena (€)</label>
                <input type="number" name="price" class="form-input" placeholder="0.00" step="0.01">
            </div>
            <div class="flex space-x-4 mt-8">
                <button type="button" onclick="saveItem('door')" class="btn-primary" data-translate="save">Zapisz</button>
                <button type="button" onclick="hideForm()" class="btn-secondary" data-translate="cancel">Anuluj</button>
            </div>
        </div>
    `,
    
    window: `
        <div class="form-section">
            <div class="form-header">
                <div class="form-header-icon">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900" data-translate="window_form_title">Formularz Okna</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="position_id">ID/Numer pozycji</label>
                    <input type="text" name="positionId" class="form-input" readonly>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="width">Szerokość</label>
                        <input type="number" name="width" class="form-input" placeholder="cm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="height">Wysokość</label>
                        <input type="number" name="height" class="form-input" placeholder="cm">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="window_type">Rodzaj</label>
                    <select name="windowType" class="form-select">
                        <option value="single_sash" data-translate="single_sash">Jednoskrzydłowe</option>
                        <option value="double_sash" data-translate="double_sash">Dwuskrzydłowe</option>
                        <option value="triple_sash" data-translate="triple_sash">Trójskrzydłowe</option>
                        <option value="fixed" data-translate="fixed">Stałe</option>
                        <option value="tilt" data-translate="tilt">Uchylne</option>
                        <option value="turn" data-translate="turn">Rozwierne</option>
                        <option value="tilt_turn" data-translate="tilt_turn">Uchylno-rozwierne</option>
                        <option value="sliding_window" data-translate="sliding_window">Przesuwne</option>
                        <option value="balcony" data-translate="balcony">Balkonowe</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="frame_color_inside">Kolor ramy wewnątrz</label>
                    <div class="flex space-x-2 mb-2">
                        ${generateColorPicker('frameColorInside')}
                    </div>
                    <input type="text" name="frameColorInsideCustom" class="form-input" placeholder="Własny kolor">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="frame_color_outside">Kolor ramy zewnątrz</label>
                    <div class="flex space-x-2 mb-2">
                        ${generateColorPicker('frameColorOutside')}
                    </div>
                    <input type="text" name="frameColorOutsideCustom" class="form-input" placeholder="Własny kolor">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="frame_division">Rozstaw w oknach</label>
                    <input type="text" name="frameDivision" class="form-input">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="handle_type">Klamki typ</label>
                    <input type="text" name="handleType" class="form-input" placeholder="np. Klasyczna, Nowoczesna, Antaba, Gałka">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="handle_color">Klamki kolor</label>
                    <input type="text" name="handleColor" class="form-input" placeholder="np. Srebrny, Złoty, Czarny">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="handle_quantity">Klamki ilość</label>
                    <input type="number" name="handleQuantity" class="form-input" min="1">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="glass_type">Szkło</label>
                    <input type="text" name="glassType" class="form-input" placeholder="np. Zwykłe, Antywłamaniowe, Energooszczędne, Hartowane">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="accessories">Dodatki</label>
                    <div class="space-y-3">
                        <div class="checkbox-group">
                            <input type="checkbox" name="mosquitoNet" id="mosquitoNet">
                            <label for="mosquitoNet" data-translate="mosquito_net">Moskitiera</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" name="ventilator" id="ventilator">
                            <label for="ventilator" data-translate="ventilator">Nawietrzak</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" name="limiter" id="limiter">
                            <label for="limiter" data-translate="limiter">Ogranicznik</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" name="internalSill" id="internalSill">
                            <label for="internalSill" data-translate="internal_sill">Parapet wewnętrzny</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="notes">Uwagi</label>
                <textarea name="notes" rows="3" class="form-textarea"></textarea>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cena (€)</label>
                <input type="number" name="price" class="form-input" placeholder="0.00" step="0.01">
            </div>
            <div class="flex space-x-4 mt-8">
                <button type="button" onclick="saveItem('window')" class="btn-primary" data-translate="save">Zapisz</button>
                <button type="button" onclick="hideForm()" class="btn-secondary" data-translate="cancel">Anuluj</button>
            </div>
        </div>
    `,

    blinds: `
        <div class="form-section">
            <div class="form-header">
                <div class="form-header-icon">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900" data-translate="blinds_form_title">Formularz Żaluzji</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="position_id">ID/Numer pozycji</label>
                    <input type="text" name="positionId" class="form-input" readonly>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="width">Szerokość</label>
                        <input type="number" name="width" class="form-input" placeholder="cm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="height">Wysokość</label>
                        <input type="number" name="height" class="form-input" placeholder="cm">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="blinds_type">Typ żaluzji</label>
                    <select name="blindsType" class="form-select">
                        <option value="aluminum" data-translate="aluminum">Aluminiowe</option>
                        <option value="wood" data-translate="wood">Drewniane</option>
                        <option value="pvc" data-translate="pvc">PVC</option>
                        <option value="bamboo" data-translate="bamboo">Bambusowe</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="color">Kolor</label>
                    <div class="flex space-x-2 mb-2">
                        ${generateColorPicker('blindsColor')}
                    </div>
                    <input type="text" name="blindsColorCustom" class="form-input" placeholder="Własny kolor">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="control_type">Sterowanie</label>
                    <select name="controlType" class="form-select">
                        <option value="cord" data-translate="cord">Sznurek</option>
                        <option value="chain" data-translate="chain">Łańcuszek</option>
                        <option value="electric" data-translate="electric">Elektryczne</option>
                    </select>
                </div>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="notes">Uwagi</label>
                <textarea name="notes" rows="3" class="form-textarea"></textarea>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cena (€)</label>
                <input type="number" name="price" class="form-input" placeholder="0.00" step="0.01">
            </div>
            <div class="flex space-x-4 mt-8">
                <button type="button" onclick="saveItem('blinds')" class="btn-primary" data-translate="save">Zapisz</button>
                <button type="button" onclick="hideForm()" class="btn-secondary" data-translate="cancel">Anuluj</button>
            </div>
        </div>
    `,

    sill: `
        <div class="form-section">
            <div class="form-header">
                <div class="form-header-icon">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900" data-translate="sill_form_title">Formularz Parapetu</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="position_id">ID/Numer pozycji</label>
                    <input type="text" name="positionId" class="form-input" readonly>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="length">Długość</label>
                        <input type="number" name="length" class="form-input" placeholder="cm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="thickness">Grubość</label>
                        <input type="number" name="thickness" class="form-input" placeholder="cm">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="material">Materiał</label>
                    <select name="material" class="form-select">
                        <option value="stone" data-translate="stone">Kamień</option>
                        <option value="wood_material" data-translate="wood_material">Drewno</option>
                        <option value="pvc_material" data-translate="pvc_material">PVC</option>
                        <option value="marble" data-translate="marble">Marmur</option>
                        <option value="granite" data-translate="granite">Granit</option>
                        <option value="conglomerate" data-translate="conglomerate">Konglomerat</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="color">Kolor</label>
                    <div class="flex space-x-2 mb-2">
                        ${generateColorPicker('sillColor')}
                    </div>
                    <input type="text" name="sillColorCustom" class="form-input" placeholder="Własny kolor">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="finish">Wykończenie</label>
                    <select name="finish" class="form-select">
                        <option value="gloss" data-translate="gloss">Połysk</option>
                        <option value="matte" data-translate="matte">Mat</option>
                        <option value="satin" data-translate="satin">Satyna</option>
                    </select>
                </div>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="notes">Uwagi</label>
                <textarea name="notes" rows="3" class="form-textarea"></textarea>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cena (€)</label>
                <input type="number" name="price" class="form-input" placeholder="0.00" step="0.01">
            </div>
            <div class="flex space-x-4 mt-8">
                <button type="button" onclick="saveItem('sill')" class="btn-primary" data-translate="save">Zapisz</button>
                <button type="button" onclick="hideForm()" class="btn-secondary" data-translate="cancel">Anuluj</button>
            </div>
        </div>
    `,

    extras: `
        <div class="form-section">
            <div class="form-header">
                <div class="form-header-icon">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900" data-translate="extras_form_title">Formularz Dodatków</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="position_id">ID/Numer pozycji</label>
                    <input type="text" name="positionId" class="form-input" readonly>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-4">Wybierz dodatki:</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="extras-card">
                            <div class="checkbox-group">
                                <input type="checkbox" name="shutters" id="shutters">
                                <label for="shutters" class="font-medium" data-translate="shutters">Rolety</label>
                            </div>
                            <div class="ml-6 mt-2 space-y-2">
                                <input type="text" name="shuttersDetails" class="form-input text-sm" placeholder="Szczegóły rolet">
                                <input type="number" name="shuttersPrice" class="form-input text-sm" placeholder="Cena (€)" step="0.01">
                            </div>
                        </div>
                        <div class="extras-card">
                            <div class="checkbox-group">
                                <input type="checkbox" name="awnings" id="awnings">
                                <label for="awnings" class="font-medium" data-translate="awnings">Markizy</label>
                            </div>
                            <div class="ml-6 mt-2 space-y-2">
                                <input type="text" name="awningsDetails" class="form-input text-sm" placeholder="Szczegóły markiz">
                                <input type="number" name="awningsPrice" class="form-input text-sm" placeholder="Cena (€)" step="0.01">
                            </div>
                        </div>
                        <div class="extras-card">
                            <div class="checkbox-group">
                                <input type="checkbox" name="intercoms" id="intercoms">
                                <label for="intercoms" class="font-medium" data-translate="intercoms">Domofon</label>
                            </div>
                            <div class="ml-6 mt-2 space-y-2">
                                <input type="text" name="intercomsDetails" class="form-input text-sm" placeholder="Szczegóły domofonu">
                                <input type="number" name="intercomsPrice" class="form-input text-sm" placeholder="Cena (€)" step="0.01">
                            </div>
                        </div>
                        <div class="extras-card">
                            <div class="checkbox-group">
                                <input type="checkbox" name="mailboxes" id="mailboxes">
                                <label for="mailboxes" class="font-medium" data-translate="mailboxes">Skrzynka pocztowa</label>
                            </div>
                            <div class="ml-6 mt-2 space-y-2">
                                <input type="text" name="mailboxesDetails" class="form-input text-sm" placeholder="Szczegóły skrzynki">
                                <input type="number" name="mailboxesPrice" class="form-input text-sm" placeholder="Cena (€)" step="0.01">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="notes">Uwagi</label>
                <textarea name="notes" rows="3" class="form-textarea"></textarea>
            </div>
            <div class="flex space-x-4 mt-8">
                <button type="button" onclick="saveItem('extras')" class="btn-primary" data-translate="save">Zapisz</button>
                <button type="button" onclick="hideForm()" class="btn-secondary" data-translate="cancel">Anuluj</button>
            </div>
        </div>
    `
};


function generateColorPicker(fieldName) {
    return colorOptions.map(color => 
        `<div class="color-option" 
             style="background-color: ${color.hex}" 
             data-color="${color.value}" 
             data-field="${fieldName}"
             onclick="selectColor('${fieldName}', '${color.value}')"
             title="${color.label}">
        </div>`
    ).join('');
}


function selectColor(fieldName, colorValue) {
    
    document.querySelectorAll(`[data-field="${fieldName}"]`).forEach(el => {
        el.classList.remove('selected');
    });
    
    
    document.querySelector(`[data-field="${fieldName}"][data-color="${colorValue}"]`).classList.add('selected');
}


function showForm(type) {
    const formContainer = document.getElementById('formContainer');
    const template = formTemplates[type];
    
    if (template) {
        formContainer.innerHTML = template;
        formContainer.classList.remove('hidden');
        formContainer.classList.add('fade-in');
        
        
        const positionInput = formContainer.querySelector('input[name="positionId"]');
        if (positionInput) {
            positionInput.value = `${type.toUpperCase()}-${String(itemCounter).padStart(3, '0')}`;
        }
        
        
        updateTranslations();
        
        
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


function hideForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.classList.add('hidden');
    formContainer.classList.remove('fade-in');
    currentEditingIndex = -1;
}


function saveItem(type) {
    const formContainer = document.getElementById('formContainer');
    const formSection = formContainer.querySelector('.form-section');
    
    if (!formSection) {
        console.error('Form section not found');
        return;
    }
    
    const itemData = {
        id: currentEditingIndex >= 0 ? orderItems[currentEditingIndex].id : itemCounter,
        type: type,
        positionId: '',
        data: {}
    };
    
    
    const inputs = formSection.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.name) {
            if (input.type === 'checkbox') {
                itemData.data[input.name] = input.checked;
            } else if (input.type === 'radio') {
                if (input.checked) {
                    itemData.data[input.name] = input.value;
                }
            } else if (input.name === 'positionId') {
                itemData.positionId = input.value;
            } else {
                itemData.data[input.name] = input.value;
            }
        }
    });
    
    
    const selectedColors = formContainer.querySelectorAll('.color-option.selected');
    selectedColors.forEach(colorEl => {
        const fieldName = colorEl.dataset.field;
        const colorValue = colorEl.dataset.color;
        if (fieldName && colorValue) {
            itemData.data[fieldName] = colorValue;
        }
    });
    
    
    if (!itemData.positionId) {
        itemData.positionId = `${type.toUpperCase()}-${String(itemCounter).padStart(3, '0')}`;
    }
    
    if (currentEditingIndex >= 0) {
        orderItems[currentEditingIndex] = itemData;
        currentEditingIndex = -1;
    } else {
        orderItems.push(itemData);
        itemCounter++;
    }
    
    console.log('Item saved:', itemData); 
    updateItemsList();
    hideForm();
}


function updateItemsList() {
    const itemsList = document.getElementById('itemsList');
    
    if (orderItems.length === 0) {
        itemsList.innerHTML = `<div class="text-gray-500 text-sm text-center py-8 bg-gray-50 rounded-lg" data-translate="no_items">Brak dodanych pozycji</div>`;
        updateTranslations();
        return;
    }
    
    itemsList.innerHTML = orderItems.map(item => {
        const price = item.data.price ? `${parseFloat(item.data.price).toFixed(2)} €` : '';
        const dimensions = item.data.width && item.data.height ? 
            `${item.data.width}×${item.data.height} cm` : 
            (item.data.length ? `${item.data.length} cm` : '');
        
        return `
            <div class="item-card slide-in">
                <div class="flex justify-between items-start mb-2">
                    <div class="font-medium text-sm text-blue-600">${item.positionId}</div>
                    <div class="flex space-x-1">
                        <button onclick="editItem(${orderItems.indexOf(item)})" class="text-blue-600 hover:text-blue-800 p-1 rounded" title="Edytuj">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button onclick="deleteItem(${orderItems.indexOf(item)})" class="text-red-600 hover:text-red-800 p-1 rounded" title="Usuń">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="text-xs text-gray-600 mb-1">
                    ${getItemTypeDisplayName(item.type)}
                </div>
                ${dimensions ? `<div class="text-xs text-gray-500 mb-1">${dimensions}</div>` : ''}
                ${price ? `<div class="text-sm font-semibold text-green-600">${price}</div>` : ''}
            </div>
        `;
    }).join('');
}


function getItemTypeDisplayName(type) {
    const typeNames = {
        door: translations[currentLanguage]?.add_door || 'Drzwi',
        window: translations[currentLanguage]?.add_window || 'Okno',
        blinds: translations[currentLanguage]?.add_blinds || 'Żaluzje',
        sill: translations[currentLanguage]?.add_sill || 'Parapet',
        extras: translations[currentLanguage]?.add_extras || 'Dodatki'
    };
    return typeNames[type] || type;
}


function editItem(index) {
    const item = orderItems[index];
    currentEditingIndex = index;
    
    showForm(item.type);
    
    
    setTimeout(() => {
        const formContainer = document.getElementById('formContainer');
        
        
        Object.entries(item.data).forEach(([key, value]) => {
            const input = formContainer.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = value;
                } else if (input.type === 'radio') {
                    if (input.value === value) {
                        input.checked = true;
                    }
                } else {
                    input.value = value;
                }
            }
        });
        
        
        colorOptions.forEach(color => {
            Object.keys(item.data).forEach(key => {
                if (item.data[key] === color.value && key.includes('Color')) {
                    const colorEl = formContainer.querySelector(`[data-field="${key}"][data-color="${color.value}"]`);
                    if (colorEl) {
                        colorEl.classList.add('selected');
                    }
                }
            });
        });
    }, 100);
}


function deleteItem(index) {
    if (confirm(translations[currentLanguage]?.confirm_delete || 'Czy na pewno chcesz usunąć tę pozycję?')) {
        orderItems.splice(index, 1);
        updateItemsList();
    }
}


function changeLanguage(lang) {
    currentLanguage = lang;
    
    
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    
    document.documentElement.lang = lang;
    
    updateTranslations();
    updateItemsList(); 
}


function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        const translation = translations[currentLanguage]?.[key];
        if (translation) {
            if (element.tagName === 'INPUT' && element.placeholder) {
                
            } else {
                element.textContent = translation;
            }
        }
    });
    
    
    const selectOptions = document.querySelectorAll('option[data-translate]');
    selectOptions.forEach(option => {
        const key = option.dataset.translate;
        const translation = translations[currentLanguage]?.[key];
        if (translation) {
            option.textContent = translation;
        }
    });
}


function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const orderDate = document.getElementById('orderDate').value;
    
    
    if (!customerName) {
        alert(translations[currentLanguage]?.required_field || 'Imię i nazwisko jest wymagane');
        return;
    }
    
    if (orderItems.length === 0) {
        alert(translations[currentLanguage]?.no_items_error || 'Brak pozycji do wygenerowania PDF');
        return;
    }
    
    
    const t = translations[currentLanguage] || translations.pl;
    
    
    function convertPolishChars(text) {
        if (!text) return '';
        return text
            .replace(/ą/g, 'a').replace(/Ą/g, 'A')
            .replace(/ć/g, 'c').replace(/Ć/g, 'C')
            .replace(/ę/g, 'e').replace(/Ę/g, 'E')
            .replace(/ł/g, 'l').replace(/Ł/g, 'L')
            .replace(/ń/g, 'n').replace(/Ń/g, 'N')
            .replace(/ó/g, 'o').replace(/Ó/g, 'O')
            .replace(/ś/g, 's').replace(/Ś/g, 'S')
            .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
            .replace(/ż/g, 'z').replace(/Ż/g, 'Z');
    }
    
    let yPosition = 20;
    
    
    doc.setFillColor(59, 130, 246); 
    doc.rect(0, 0, 210, 45, 'F');
    
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('MatixHol', 20, 25);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(convertPolishChars(t.order_summary || 'Podsumowanie Zamowienia'), 20, 35);
    
    
    doc.setTextColor(0, 0, 0);
    yPosition = 55;
    
    
    doc.setFillColor(239, 246, 255); 
    doc.rect(15, yPosition - 5, 180, 20, 'F');
    doc.setDrawColor(59, 130, 246);
    doc.rect(15, yPosition - 5, 180, 20, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(59, 130, 246);
    doc.text(convertPolishChars(`${t.order_status || 'Status'}: ${t.order_completed || 'Sfinalizowano'}`), 20, yPosition + 3);
    
    
    const currentDate = new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'nl' ? 'nl-NL' : 'pl-PL');
    doc.text(convertPolishChars(`${t.completion_date || 'Data finalizacji'}: ${currentDate}`), 20, yPosition + 12);
    
    doc.setTextColor(0, 0, 0);
    yPosition += 30;
    
    
    doc.setFillColor(59, 130, 246);
    doc.rect(15, yPosition - 3, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(convertPolishChars(t.customer_data || 'Dane Klienta'), 20, yPosition + 2);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    yPosition += 15;
    
    doc.setFontSize(10);
    doc.text(convertPolishChars(`${t.full_name || 'Imie i nazwisko'}: ${customerName}`), 20, yPosition);
    yPosition += 6;
    
    if (customerPhone) {
        doc.text(convertPolishChars(`${t.phone || 'Telefon'}: ${customerPhone}`), 20, yPosition);
        yPosition += 6;
    }
    
    if (customerAddress) {
        doc.text(convertPolishChars(`${t.address || 'Adres'}: ${customerAddress}`), 20, yPosition);
        yPosition += 6;
    }
    
    if (customerEmail) {
        doc.text(convertPolishChars(`${t.email || 'Email'}: ${customerEmail}`), 20, yPosition);
        yPosition += 6;
    }
    
    if (orderDate) {
        doc.text(convertPolishChars(`${t.order_date || 'Data zamowienia'}: ${orderDate}`), 20, yPosition);
        yPosition += 6;
    }
    
    yPosition += 15;
    
    
    doc.setFillColor(59, 130, 246);
    doc.rect(15, yPosition - 3, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(convertPolishChars(t.added_items || 'Dodane Pozycje'), 20, yPosition + 2);
    
    doc.setTextColor(0, 0, 0);
    yPosition += 15;
    
    let totalPrice = 0;
    
    orderItems.forEach((item, index) => {
        
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
        
        
        doc.setFillColor(248, 250, 252); 
        doc.rect(15, yPosition - 2, 180, 8, 'F');
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235); 
        doc.text(convertPolishChars(`${index + 1}. ${item.positionId} - ${getItemTypeDisplayName(item.type)}`), 20, yPosition + 3);
        yPosition += 12;
        
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        
        
        const details = generateItemDetails(item, t);
        details.forEach(detail => {
            if (yPosition > 250) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(convertPolishChars(detail), 25, yPosition);
            yPosition += 4;
        });
        
        
        if (item.data.price) {
            const price = parseFloat(item.data.price);
            totalPrice += price;
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(34, 197, 94); 
            doc.text(convertPolishChars(`${t.price || 'Cena'}: ${price.toFixed(2)} €`), 25, yPosition);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            yPosition += 6;
        }
        
        yPosition += 8; 
    });
    
    
    if (totalPrice > 0) {
        yPosition += 10;
        doc.setFillColor(59, 130, 246);
        doc.rect(15, yPosition - 5, 180, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(convertPolishChars(`${t.total_price || 'Laczna cena'}: ${totalPrice.toFixed(2)} €`), 20, yPosition + 2);
    }
    
    
    yPosition = 285;
    doc.setTextColor(107, 114, 128); 
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('MatixHol - System Zamowien', 20, yPosition);
    doc.text(`Wygenerowano: ${new Date().toLocaleString('pl-PL')}`, 120, yPosition);
    
    
    const filename = `MatixHol_${convertPolishChars(t.order_summary?.replace(/\s+/g, '_') || 'Zamowienie')}_${new Date().getTime()}.pdf`;
    doc.save(filename);
}


function generateItemDetails(item, translations) {
    const details = [];
    const data = item.data;
    
    
    if (data.width && data.height) {
        details.push(`${translations.dimensions || 'Wymiary'}: ${data.width}×${data.height} cm`);
    }
    
    if (data.length) {
        details.push(`${translations.length || 'Długość'}: ${data.length} cm`);
    }
    
    if (data.thickness) {
        details.push(`${translations.thickness || 'Grubość'}: ${data.thickness} cm`);
    }
    
    
    switch (item.type) {
        case 'door':
            if (data.doorType) details.push(`${translations.type || 'Rodzaj'}: ${data.doorType}`);
            if (data.frameColorInside) details.push(`${translations.frame_color_inside || 'Kolor ramy wewnątrz'}: ${data.frameColorInside}`);
            if (data.frameColorOutside) details.push(`${translations.frame_color_outside || 'Kolor ramy zewnątrz'}: ${data.frameColorOutside}`);
            if (data.handleType) details.push(`${translations.handle_type || 'Klamka'}: ${data.handleType}`);
            if (data.openingSide) details.push(`${translations.opening_side || 'Strona otwierania'}: ${data.openingSide}`);
            break;
            
        case 'window':
            if (data.windowType) details.push(`${translations.window_type || 'Typ okna'}: ${data.windowType}`);
            if (data.frameColorInside) details.push(`${translations.frame_color_inside || 'Kolor ramy wewnątrz'}: ${data.frameColorInside}`);
            if (data.frameColorOutside) details.push(`${translations.frame_color_outside || 'Kolor ramy zewnątrz'}: ${data.frameColorOutside}`);
            if (data.glassType) details.push(`${translations.glass_type || 'Szkło'}: ${data.glassType}`);
            break;
            
        case 'blinds':
            if (data.blindsType) details.push(`${translations.blinds_type || 'Typ'}: ${data.blindsType}`);
            if (data.blindsColor) details.push(`${translations.color || 'Kolor'}: ${data.blindsColor}`);
            if (data.controlType) details.push(`${translations.control_type || 'Sterowanie'}: ${data.controlType}`);
            break;
            
        case 'sill':
            if (data.material) details.push(`${translations.material || 'Materiał'}: ${data.material}`);
            if (data.sillColor) details.push(`${translations.color || 'Kolor'}: ${data.sillColor}`);
            if (data.finish) details.push(`${translations.finish || 'Wykończenie'}: ${data.finish}`);
            break;
            
        case 'extras':
            const extras = [];
            if (data.shutters) extras.push(translations.shutters || 'Rolety');
            if (data.awnings) extras.push(translations.awnings || 'Markizy');
            if (data.intercoms) extras.push(translations.intercoms || 'Domofon');
            if (data.mailboxes) extras.push(translations.mailboxes || 'Skrzynka pocztowa');
            if (extras.length > 0) {
                details.push(`${translations.accessories || 'Dodatki'}: ${extras.join(', ')}`);
            }
            break;
    }
    
    
    if (data.notes && data.notes.trim()) {
        details.push(`${translations.notes || 'Uwagi'}: ${data.notes}`);
    }
    
    return details;
}


document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('orderDate').value = new Date().toISOString().split('T')[0];
    
    
    changeLanguage('pl');
});
