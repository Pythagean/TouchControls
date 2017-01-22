using UnityEngine;
using System.Collections;

public class TouchController : MonoBehaviour {

	public AudioClip rockSound;
	public GameObject wall;
	public OVRInput.Controller Controller;
	private AudioSource source;
	public GameObject Player;

	private Transform toLane;

	private int wallCooldownCounterMax = 1000;
	private int wallCooldownCounter = 1000;
	private bool wallCooldown = false;



	// Update is called once per frame
	void Update () {
		transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);
		transform.localRotation = OVRInput.GetLocalControllerRotation(Controller);

		//Debug.Log (wallCooldownCounter.ToString ());


		if (Input.GetAxis("RHandTrigger") == 1 || Input.GetAxis("LHandTrigger") == 1) {
			//Debug.Log ("Right");
			if (!wallCooldown){
				Debug.Log (transform.position.ToString ());

				Vector3 direction = (toLane.transform.position - transform.position).normalized;
				//Vector3 distance = Vector3.Distance(

				GameObject createdWall = Instantiate(wall, transform.position, Quaternion.identity) as GameObject;
				wallCooldown = true;
			}




		}

		if (wallCooldown) {
			wallCooldownCounter--;
			if (wallCooldownCounter < 0) {
				wallCooldownCounter = wallCooldownCounterMax;
				wallCooldown = false;
			}
		}


		if (Input.GetButtonDown("Fire1")) {
		//	source.PlayOneShot (rockSound, 1.0f);
		}
		//if (OVRInput.GetDown(OVRInput.Axis1D.PrimaryHandTrigger)) {
		//}

		//if (Input.GetButtonDown (OVRInput.Axis1D.PrimaryHandTrigger)) {
		//}
	}




}