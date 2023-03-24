const galleryData = {
	"2022-2023": [],
	"2021-2022": [],
	"2020-2021": [],
	"2019-2020": [
		{"URL": "images/gallery/2019-2020/ducttape.JPG", "description": "Duct Taping the RA for Charity"},
		{"URL": "images/gallery/2019-2020/garden1.JPG", "description": "Community Garden"},
		{"URL": "images/gallery/2019-2020/gh1.JPG", "description": "Guitar Hero 1"},
		{"URL": "images/gallery/2019-2020/gh2.JPG", "description": "Guitar Hero 2"},
		{"URL": "images/gallery/2019-2020/hallo1.jpg", "description": "Halloween Party"},
		{"URL": "images/gallery/2019-2020/letch1.JPG", "description": "Letchworth 1"},
		{"URL": "images/gallery/2019-2020/letch2.jpg", "description": "Letchworth 2"},
		{"URL": "images/gallery/2019-2020/letch4.jpg", "description": "Letchworth 3"},
		{"URL": "images/gallery/2019-2020/letch5.jpg", "description": "Letchworth 4"},
		{"URL": "images/gallery/2019-2020/mudcircle.JPG", "description": "Mud Tug 1"},
		{"URL": "images/gallery/2019-2020/mudjump.JPG", "description": "Mud Tug 2"},
		{"URL": "images/gallery/2019-2020/mudselfie.jpg", "description": "Mud Tug 3"},
		{"URL": "images/gallery/2019-2020/party1.jpg", "description": "Christmas Party 1"},
		{"URL": "images/gallery/2019-2020/party2.jpg", "description": "Christmas Party 2"},
		{"URL": "images/gallery/2019-2020/ritchie1.jpg", "description": "Ritchie the Balloon"},
		{"URL": "images/gallery/2019-2020/social1.jpg", "description": "Social Lounge"},
		{"URL": "images/gallery/2019-2020/square1.jpg", "description": "Four-Square"},
		{"URL": "images/gallery/2019-2020/truth.jpg", "description": "The Staffs of Truth"}
	],
	"2018-2019": [],
	"2017-2018": [ 
		{"URL": "images/gallery/2017-2018/dodgeball1.png", "description": "Dodgeball 1"}, 
		{"URL": "images/gallery/2017-2018/dodgeball2.JPG", "description": "Dodgeball 2"},
		{"URL": "images/gallery/2017-2018/dodgeball3.png", "description": "Dodgeball 3"},
		{"URL": "images/gallery/2017-2018/hauntedtrail2017.JPG", "description": "Haunted Trail"},
		{"URL": "images/gallery/2017-2018/hogshalloweenparty2017.jpg", "description": "Halloween Party"},
		{"URL": "images/gallery/2017-2018/imagine20181.JPG", "description": "Imagine RIT 1"},
		{"URL": "images/gallery/2017-2018/imagine20182.jpg", "description": "Imagine RIT 2"},
		{"URL": "images/gallery/2017-2018/imagine20183.JPG", "description": "Imagine RIT 3"},
		{"URL": "images/gallery/2017-2018/imagine20184.JPG", "description": "Imagine RIT 4"},
		{"URL": "images/gallery/2017-2018/imagine20185.JPG", "description": "Imagine RIT 5"},
		{"URL": "images/gallery/2017-2018/imagine20186.JPG", "description": "Imagine RIT 6"},
		{"URL": "images/gallery/2017-2018/imagine20187.PNG", "description": "Imagine RIT 7"}
	],
}

let imageFailListener = {
	type: "error",
	once: true,
	passive: true,
	capture: false,
	listener: (event) => {
		if (event.target instanceof HTMLImageElement) {
			event.target.setAttribute("src", "images/unknownProfile.svg");
		} else {
			throw "imageFail called on something other than an image";
		}
	}
};

processGallery: {
	// Load all image elements
	gridItems = {}
	for (var year in galleryData) {
		gridItems[year] = galleryData[year].map(image =>
			new Elmen("div").withClasses("bgrid", "folio-item").withChildren(
				new Elmen("div").withClasses("item-wrap").withChildren(
					new Elmen("img").withAttributes({src: image.URL, alt: image.description}).withListeners(imageFailListener)
				)
			)
		);
	};
	
	// Create event listener that populates the page with all gallery sections
	document.addEventListener("DOMContentLoaded", () => {
		let gallerySection = document.getElementById("gallery");
		if (gallerySection) {
			for (var years in gridItems) {
				gallerySection.appendChild(
					new Elmen("section").withClasses("galleryyear").withAttributes({id: years}).withChildren(
						new Elmen("div").withClasses("row", "section-head").withChildren(
							new Elmen("div").withClasses("twelve", "columns").withChildren(
								new Elmen("br"),
								new Elmen("br"),
								new Elmen("h1").withChildren(
									years, new Elmen("span").withChildren("."),
								),
								new Elmen("hr")
							)
						),
						new Elmen("div").withClasses("row", "items").withChildren(
							new Elmen("div").withClasses("bgrid-fourth", "s-bgrid-third", "tab-bgrid-half").withAttributes({id: "portfolio-wrapper"}).withChildren(
								...gridItems[years]
							)
						)
					).done()
				);
			};
		}
		
		
		// from main.js:
		/*
		$('.item-wrap a').magnificPopup({

			 type:'inline',
			 fixedContentPos: false,
			 removalDelay: 300,
			 showCloseBtn: false,
			 mainClass: 'mfp-fade'

		});*/
		/*
		$(document).on('click', '.popup-modal-dismiss', function (e) {
				e.preventDefault();
				$.magnificPopup.close();
		});*/
	}, {passive: true, once: true, capture: false});
}