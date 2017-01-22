using UnityEngine;
using System.Collections;

public class PullUpWall : MonoBehaviour {


	public AudioClip rockSound;
	public GameObject wall;
	private AudioSource source;
	public OVRInput.Controller Controller;

	private bool playedWallSound = false;

	void Awake() {
		source = GetComponent<AudioSource> ();
	}

	// Update is called once per frame
	void Update () {
//		if (OVRInput.Axis1D.PrimaryHandTrigger.ToString() == 1){
//			Debug.Log (Time.time);
//		}

		//Debug.Log (Input.GetAxis ("RHandTrigger").ToString ());
		//Debug.Log (OVRInput.Axis1D.PrimaryHandTrigger.ToString());
		//ebug.Log (OVRInput.GetActiveController ().ToString ());
		if (Input.GetAxis("RHandTrigger") == 1 || Input.GetAxis("LHandTrigger") == 1) {
			//Debug.Log ("Right");
			//createRockWall();
			transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);

			playSound();

		}


	
	}

	void playSound(){
		if (!playedWallSound) {
			source.PlayOneShot(rockSound, 1f);
			playedWallSound = true;
		}
	}
}
